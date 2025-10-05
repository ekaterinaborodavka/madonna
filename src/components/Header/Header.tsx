import LangSwitch from "../LangSwitch/LangSwitch";
import logo from "../../assets/images/logo.png";
import madonna from "../../assets/images/madonna.jpg";

import "./header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
       <img src={madonna} alt="Dj Madonna" className="header_img" />
      <div className="header_container">
        <img src={logo} alt="logo" className="header_logo_mb" />
        <LangSwitch />
        <div className="header_title_wrapper">
          <h1 className="header_title">Dj Madonna</h1>
          <img src={logo} alt="logo" className="header_logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
