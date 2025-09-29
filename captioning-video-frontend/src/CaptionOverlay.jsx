import { useCurrentFrame, useVideoConfig } from 'remotion';
import { useVideo } from './VideoContext';

export const CaptionOverlay = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { captions, captionStyle } = useVideo();
  
  const currentTime = frame / fps;
  const activeCaption = captions.find(c => currentTime >= c.start && currentTime <= c.end);
  
  if (!activeCaption) return null;
  
  const common = {
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    lineHeight: 1.3,
    textAlign: 'center',
    fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif'
  };

  if (captionStyle === 'top-bar') {
    return (
      <div style={{
        ...common,
        top: 0,
        left: 0,
        right: 0,
        padding: '12px 24px',
        background: 'rgba(0,0,0,0.7)'
      }}>
        {activeCaption.text}
      </div>
    );
  }

  // default: bottom-center
  return (
    <div style={{
      ...common,
      bottom: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '10px 20px',
      background: 'rgba(0,0,0,0.75)',
      borderRadius: 6,
      maxWidth: '80%'
    }}>
      {activeCaption.text}
    </div>
  );
};