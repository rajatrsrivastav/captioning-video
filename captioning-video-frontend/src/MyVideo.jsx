import { AbsoluteFill, Video } from 'remotion';
import { CaptionOverlay } from './videoCaption';
import { useVideo } from './videoContext';

export const MyVideo = () => {
  const { videoUrl } = useVideo();
  
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {videoUrl && <Video src={videoUrl} />}
      <CaptionOverlay />
    </AbsoluteFill>
  );
};