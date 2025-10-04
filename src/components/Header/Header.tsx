import LangSwitch from "../LangSwitch/LangSwitch";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import TelegramIcon from "../../assets/icons/TelegramIcon";
import madonna from "../../assets/images/madonna.jpg";
import logo from "../../assets/images/logo.png";

import "./header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={madonna} alt="Dj Madonna" className="header_img" />
      <div className="header_container">
        <LangSwitch />
        <div className="header_title_wrapper">
          <h1 className="header_title">Dj Madonna</h1>
          <img src={logo} alt="logo" className="header_logo" />
        </div>
        <div className="contacts">
          <a
            href="https://www.instagram.com/_dj__madonna"
            target="_blank"
            rel="noopener noreferrer"
            className="contact_link"
          >
            <InstagramIcon />
          </a>
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
    </header>
  );
};

export default Header;
