import { useTranslation } from "react-i18next";

import "./langswitch.css";

const langs = ["en", "ua", "ru"];

const LangSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div className="lang_container">
      {langs.map((lang, ind) => (
        <button
          key={ind}
          className={`lang_button ${currentLang === lang ? "active" : ""}`}
          onClick={() => changeLanguage(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LangSwitch;
