import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption =
    weatherOptions.find(
      (option) =>
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition,
    ) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "C"
          ? weatherData.temp.C
          : weatherData.temp.F}
        ° {currentTemperatureUnit}
      </p>

      <img
        src={weatherOption.url}
        alt={`${weatherOption.day ? "day" : "night"} ${weatherOption.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
