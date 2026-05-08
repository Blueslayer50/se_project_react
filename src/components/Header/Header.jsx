import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__right">
        <ToggleSwitch />

        <button
          type="button"
          className="header__add-clothes-button"
          onClick={handleAddClick}
        >
          + Add Clothes
        </button>

        <div className="header__user-container">
          <Link to="/profile" className="header__nav-link">
            Profile
          </Link>

          <p className="header__username">Lebron James</p>
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
