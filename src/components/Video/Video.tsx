import beggin from "../../assets/begin.mp4";
import inter from "../../assets/inter.mp4";
import suoermodel from "../../assets/supermodel.mp4";
import raining_man from "../../assets/raining_man.mp4";

import "./video.css";

const videos = [beggin, inter, suoermodel, raining_man];

const Video: React.FC = () => {
  return (
    <div className="video_container">
      {videos.map((v, idx) => (
        <video key={idx} src={v} controls className="video_player" />
      ))}
    </div>
  );
};

export default Video;
