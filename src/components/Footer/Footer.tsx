import { useTranslation } from "react-i18next";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import TelegramIcon from "../../assets/icons/TelegramIcon";
import "./footer.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <h3 className="footer_title">{t("contacts")}:</h3>
      <div className="footer_contacts">
          <div>
            <p className="link_text">{t("Follow me")}: </p>
            <a
              href="https://www.instagram.com/_dj__madonna"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_link"
            >
              <InstagramIcon />
            </a>
          </div>
          <div>
            <p className="link_text">{t("Organization")}: </p>
            <a
              href="https://t.me/dj_madonna_cooperation"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_link"
            >
              <TelegramIcon />
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
