import { useTranslation } from "react-i18next";

import "./video.css";

const videos: { title: string; src: string }[] = [
  {
    title: "Beggin",
    src: "https://res.cloudinary.com/dakeprota/video/upload/v1761403375/begin_kxhcm3.mp4",
  },
  {
    title: "Inter",
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

  return (
    <div className="video_container">
      <h3 className="video_title">{t("Video")}</h3>
      {videos.map((v, idx) => (
        <video key={idx} controls playsInline className="video_player">
          <source src={v.src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
};

export default Video;
