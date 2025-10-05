import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import drums from "../../assets/images/drums.png";

import "./tabs.css";

const Tabs: React.FC = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"technical" | "household">(
    "technical"
  );
  const [open, setOpen] = useState(false);

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
            <img
              src={drums}
              alt="drums"
              className="technical_img"
              onClick={() => setOpen(true)}
            />
          </>
        )}
        {activeTab === "household" && (
          <Trans
            i18nKey="household_rider_content"
            components={{ p: <p />, ul: <ul />, li: <li /> }}
          />
        )}
        {open && (
          <div className="overlay" onClick={() => setOpen(false)}>
            <img src={drums} alt="Dj Madonna" className="overlay_img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
