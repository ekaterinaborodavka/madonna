import React, { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import drums from "../../assets/images/drums.png";

import "./tabs.css";

const Tabs: React.FC = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"technical" | "household">(
    "technical"
  );
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="tabs_container">
      <div className="tabs_buttons">
        <button
          className={`tab_button ${activeTab === "technical" ? "active" : ""}`}
          onClick={() => setActiveTab("technical")}
        >
          {t("technical_rider_title")}
        </button>
        <button
          className={`tab_button ${activeTab === "household" ? "active" : ""}`}
          onClick={() => setActiveTab("household")}
        >
          {t("household_rider_title")}
        </button>
      </div>

      <div className={`tab_content ${activeTab}`}>
        {activeTab === "technical" && (
          <>
            <div>
              <Trans
                i18nKey="technical_rider_content"
                components={{ ul: <ul />, li: <li /> }}
              />
              <Trans
                i18nKey="technical_rider_content_drum"
                components={{ ul: <ul />, li: <li /> }}
              />
            </div>
            <button
              type="button"
              className="technical_image_button"
              aria-label="Open drum rider image"
              onClick={() => setOpen(true)}
            >
              <img src={drums} alt="Drum rider" className="technical_img" />
            </button>
          </>
        )}
        {activeTab === "household" && (
          <Trans
            i18nKey="household_rider_content"
            components={{ p: <p />, ul: <ul />, li: <li /> }}
          />
        )}
        {open && (
          <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Drum rider image"
            onClick={() => setOpen(false)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="overlay_close"
              aria-label="Close image"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <img
              src={drums}
              alt="Drum rider"
              className="overlay_img"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
