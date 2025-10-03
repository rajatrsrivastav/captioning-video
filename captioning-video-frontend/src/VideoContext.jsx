import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(300);
  const [captions, setCaptions] = useState([]);
  const [captionStyle, setCaptionStyle] = useState('bottom-center');
  return (
    <VideoContext.Provider value={{ 
      videoUrl, setVideoUrl, 
      videoDuration, setVideoDuration,
      captions, setCaptions,
      captionStyle, setCaptionStyle
    }}>
      {children}
    </VideoContext.Provider>
  );
};