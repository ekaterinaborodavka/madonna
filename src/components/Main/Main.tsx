import { Trans, useTranslation } from "react-i18next";
import Tabs from "../Tabs/Tabs";
import Video from "../Video/Video";

import "./main.css";

const Main: React.FC = () => {
  const { ready } = useTranslation();

  if (!ready) return null;

  return (
    <main className="main">
      <div className="main_info">
        <div className="main_text">
          <Trans
            i18nKey="main_text"
            components={{ p: <p />, ul: <ul />, li: <li /> }}
          />
        </div>
        <Tabs />
      </div>
      <Video />
    </main>
  );
};

export default Main;
