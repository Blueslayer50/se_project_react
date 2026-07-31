import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems,
  handleCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = weatherData.type
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : clothingItems;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "C"
            ? weatherData.temp.C
            : weatherData.temp.F}{" "}
          °{currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
