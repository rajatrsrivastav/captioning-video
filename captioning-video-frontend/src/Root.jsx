import "./index.css";
import { Composition } from "remotion";
import { VideoUploadToolbar } from "./toolbar";
import { MyVideo } from "./MyVideo";
import { VideoProvider, useVideo } from "./videoContext";

const DynamicVideo = () => {
  const { videoDuration } = useVideo();
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={videoDuration || 300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

export const RemotionRoot = () => {
  return (
    <VideoProvider>
      <VideoUploadToolbar />
      <DynamicVideo />
    </VideoProvider>
  );
};
