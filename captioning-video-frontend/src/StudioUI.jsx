import React, { useState } from 'react';
import './StudioUI.css';
import { useVideo } from './VideoContext';
import { parseWebVTT } from './utils/vttParser';

export const StudioUI = () => {
  const { setCaptions, setVideoUrl, setVideoDuration, captionStyle, setCaptionStyle } = useVideo();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCaptions = async () => {
    if (!video) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('video', video);
    
    try {
      const response = await fetch('http://localhost:4000/api/v1/transcribe', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (result.success && result.webvtt) {
        const parsedCaptions = parseWebVTT(result.webvtt);
        setCaptions(parsedCaptions);
        console.log('Captions loaded:', parsedCaptions.length);
      }
    } catch (error) {
      console.error('Failed:', error);
    }
    
    setLoading(false);
  };  return (
    <div className="toolbar">
      <input 
        type="file" 
        accept="video/mp4" 
        onChange={(e) => {
          const file = e.target.files[0];
          setVideo(file);
          if (file) {
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
            
            const video = document.createElement('video');
            video.src = url;
            video.onloadedmetadata = () => {
              setVideoDuration(Math.round(video.duration * 30));
            };
          }
        }}
        className="file-input"
        id="video-upload"
      />
      <label htmlFor="video-upload" className="btn">
        Choose Video
      </label>
      
      {video && <span>✓ {video.name}</span>}
      
      <button onClick={generateCaptions} disabled={!video || loading} className="btn">
        {loading ? 'Processing...' : 'Generate Captions'}
      </button>

      <select
        value={captionStyle}
        onChange={(e) => setCaptionStyle(e.target.value)}
        className="btn"
        aria-label="Caption style"
      >
        <option value="bottom-center">Bottom Center</option>
        <option value="top-bar">Top Bar</option>
      </select>
    </div>
  );
};