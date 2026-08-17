import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <p className="header__date">{weatherData.date}</p>
        <p className="header__location">{weatherData.city}</p>
      </div>

      <div className="header__right">
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
          <Link to="/profile" className="header__profile">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="header__avatar"
            />
            <span className="header__name">{currentUser.name}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
