import beggin from "../../assets/begin.mp4";
import suoermodel from "../../assets/supermodel.mp4";

import "./video.css"

const Video: React.FC = () => {
  return (
    <div className="video_container">
      <video
        src={beggin}
        controls
        className="video_player"
      />
      <video
        src={suoermodel}
        controls
        className="video_player"
      />
    </div>
  );
};

export default Video;
