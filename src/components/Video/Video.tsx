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
  const isAndroid = /Android/i.test(navigator.userAgent);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    setActiveSlide(index);
    void videoRefs.current[index]?.play().catch(() => undefined);
  };

  const selectSlide = (index: number) => {
    if (index !== activeSlide) videoRefs.current[activeSlide]?.pause();
    setActiveSlide(index);
    if (window.matchMedia("(max-width: 768px)").matches) {
      cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const changeSlide = (direction: number) => {
    selectSlide((activeSlide + direction + videos.length) % videos.length);
  };

  const getSlidePosition = (index: number) => {
    const distance = (index - activeSlide + videos.length) % videos.length;

    if (distance === 0) return "is-active";
    if (distance === 1) return "is-right";
    if (distance === videos.length - 1) return "is-left";

    return "is-back";
  };

  const handleCarouselScroll = () => {
    const viewport = carouselViewportRef.current;
    if (!viewport || !window.matchMedia("(max-width: 768px)").matches) return;

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const closestIndex = cardRefs.current.reduce((closest, card, index) => {
      if (!card) return closest;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cardRefs.current[closest];
      const closestCenter = closestCard ? closestCard.offsetLeft + closestCard.offsetWidth / 2 : 0;

      return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
        ? index
        : closest;
    }, 0);

    setActiveSlide(closestIndex);
  };

  return (
    <div className="video_container">
      <h3 className="video_title">{t("Video")}</h3>
      <div className="video_carousel">
        <div
          ref={carouselViewportRef}
          className="video_carousel_viewport"
          onScroll={handleCarouselScroll}
        >
          <button
            type="button"
            className="video_carousel_button video_carousel_button_previous"
            aria-label="Previous video"
            onClick={() => changeSlide(-1)}
          >
            ‹
          </button>
          <div className="video_track">
            {videos.map((v, idx) => (
              <div
                ref={(card) => {
                  cardRefs.current[idx] = card;
                }}
                className={`video_card ${getSlidePosition(idx)}`}
                key={v.title}
                onClick={() => selectSlide(idx)}
              >
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
                {!isAndroid && playingVideo !== idx && (
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
          <button
            type="button"
            className="video_carousel_button video_carousel_button_next"
            aria-label="Next video"
            onClick={() => changeSlide(1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
