import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function Header({
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          wtwr°
        </Link>
        <p className="header__location">
          {weatherData.date}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {!isLoggedIn && (
          <>
            <button className="header__button" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__button" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}

        {isLoggedIn && (
          <>
            <button className="header__button" onClick={handleAddClick}>
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile">
              <span className="header__name">{currentUser.name}</span>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
