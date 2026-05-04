import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOption =
    weatherOptions.find(
      (option) =>
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition,
    ) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}° F</p>
      <img
        src={weatherOption.url}
        alt={`${weatherOption.day ? "day" : "night"} ${weatherOption.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
