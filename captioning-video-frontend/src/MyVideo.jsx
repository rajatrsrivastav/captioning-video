import { AbsoluteFill, Video } from 'remotion';
import { CaptionOverlay } from './CaptionOverlay';
import { useVideo } from './VideoContext';

export const MyVideo = () => {
  const { videoUrl } = useVideo();
  
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {videoUrl && <Video src={videoUrl} />}
      <CaptionOverlay />
    </AbsoluteFill>
  );
};