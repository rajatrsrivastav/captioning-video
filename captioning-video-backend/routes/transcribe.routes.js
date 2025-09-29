const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');

const transcribeRoute = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

transcribeRoute.post('/', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No video uploaded' });
  }

  const videoPath = `video_${Date.now()}.mp4`;
  const audioPath = `audio_${Date.now()}.wav`;
  const vttPath = `output_${Date.now()}.vtt`;

  try {
    fs.writeFileSync(videoPath, req.file.buffer);

    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${videoPath} -vn -acodec pcm_s16le -ar 16000 -ac 1 ${audioPath}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      exec(`./whisper.cpp/build/bin/whisper-cli -m ./whisper.cpp/models/ggml-base.bin -f ${audioPath} --language en --output-vtt --output-file ${vttPath.replace('.vtt', '')}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const vttContent = fs.readFileSync(vttPath, 'utf8');

    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath);
    fs.unlinkSync(vttPath);

    res.json({ 
      success: true,
      webvtt: vttContent.trim()
    });

  } catch (error) {
    console.log('Error:', error);
    res.json({ error: 'Transcription failed' });
  }
});

module.exports = transcribeRoute;