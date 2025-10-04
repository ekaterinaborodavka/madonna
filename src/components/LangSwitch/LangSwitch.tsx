import { useTranslation } from "react-i18next";

import "./langswitch.css";

const LangSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div className="lang_container">
      <button
        className={`lang_button ${currentLang === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={`lang_button ${currentLang === "ua" ? "active" : ""}`}
        onClick={() => changeLanguage("ua")}
      >
        UA
      </button>
    </div>
  );
}

export default LangSwitch;
