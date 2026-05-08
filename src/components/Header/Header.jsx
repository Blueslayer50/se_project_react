import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="App logo" />

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <button
        type="button"
        className="header__add-clothes-button"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>

      <div className="header__user-container">
        <p className="header__username">Lebron James</p>
        <img className="header__avatar" src={avatar} alt="User avatar" />
      </div>
    </header>
  );
}

export default Header;
