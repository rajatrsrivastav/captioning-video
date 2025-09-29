const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');

const transcribeRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

transcribeRoute.post('/', upload.single('video'), async (req, res) => {
  const timestamp = Date.now();
  const videoPath = `video_${timestamp}.mp4`;
  const audioPath = `audio_${timestamp}.wav`;

  try {
    fs.writeFileSync(videoPath, req.file.buffer);

    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${videoPath} -vn -acodec pcm_s16le -ar 16000 -ac 1 ${audioPath}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const outputFile = `output_${timestamp}.json`;
    await new Promise((resolve, reject) => {
      exec(`./venv/bin/python3 src/utils/whisper.py ${audioPath} --output ${outputFile}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const result = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    let vtt = 'WEBVTT\n\n';
    
    result.segments.forEach((segment, i) => {
      const start = new Date(segment.start * 1000).toISOString().substr(11, 12);
      const end = new Date(segment.end * 1000).toISOString().substr(11, 12);
      vtt += `${i + 1}\n${start} --> ${end}\n${segment.text}\n\n`;
    });

    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath);
    fs.unlinkSync(outputFile);

    res.json({ success: true, webvtt: vtt });

  } catch (error) {
    console.error('Transcription error:', error);
    
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
    
    res.json({ 
      error: 'Transcription failed',
      details: error.message,
      help: 'Make sure Python environment is set up: ./setup-python.sh'
    });
  }
});

module.exports = transcribeRoute;