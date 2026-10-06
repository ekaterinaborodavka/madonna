import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "./video.css";

const videos: { title: string; src: string }[] = [
  {
    title: "Beggin",
    src: "https://res.cloudinary.com/dakeprota/video/upload/v1761403375/begin_kxhcm3.mp4",
  },
  {
    title: "Guest Interaction",
    src: "https://res.cloudinary.com/dakeprota/video/upload/v1761403362/inter_nagloh.mp4",
  },
  {
    title: "Supermodel",
    src: "https://res.cloudinary.com/dakeprota/video/upload/v1761403347/supermodel_dr412r.mp4",
  },
  {
    title: "Raining man",
    src: "https://res.cloudinary.com/dakeprota/video/upload/v1761403365/raining_man_kwxrjh.mp4",
  },
];

const Video: React.FC = () => {
  const { t } = useTranslation();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handlePlay = (activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeIndex) video.pause();
    });
    setPlayingVideo(activeIndex);
  };

  const handlePause = (index: number) => {
    setPlayingVideo((current) => (current === index ? null : current));
  };

  const startVideo = (index: number) => {
    void videoRefs.current[index]?.play().catch(() => undefined);
  };

  return (
    <div className="video_container">
      <h3 className="video_title">{t("Video")}</h3>
      {videos.map((v, idx) => (
        <div className="video_card" key={v.title}>
          <video
            ref={(video) => {
              videoRefs.current[idx] = video;
            }}
            controls
            playsInline
            preload="metadata"
            className="video_player"
            aria-label={v.title}
            onPlay={() => handlePlay(idx)}
            onPause={() => handlePause(idx)}
            onEnded={() => handlePause(idx)}
          >
            <source src={v.src} type="video/mp4" />
          </video>
          <span className="video_name">{v.title}</span>
          {playingVideo !== idx && (
            <button
              type="button"
              className="video_play_button"
              aria-label={`Play ${v.title}`}
              onClick={() => startVideo(idx)}
            >
              ▶
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Video;
