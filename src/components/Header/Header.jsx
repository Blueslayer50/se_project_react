import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const avatarLetter = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

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

        {isLoggedIn && (
          <button
            type="button"
            className="header__add-clothes-button"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
        )}

        <div className="header__user-container">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header__nav-link">
                Profile
              </Link>

              <p className="header__username">{currentUser.name}</p>

              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="User avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{avatarLetter}</div>
              )}

              <button
                type="button"
                className="header__logout-button"
                onClick={onSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-button"
                onClick={onLoginClick}
              >
                Log In
              </button>

              <button
                type="button"
                className="header__auth-button"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
