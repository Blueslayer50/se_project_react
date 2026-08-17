import "./WeatherCard.css";

export default function WeatherCard({ weatherData, currentTemperatureUnit }) {
  const temp = weatherData.temp[currentTemperatureUnit];
  const unit = currentTemperatureUnit;

  return (
    <section className="weather-card">
      <div className="weather-card__info">
        <p className="weather-card__date">{weatherData.date}</p>
        <p className="weather-card__location">{weatherData.city}</p>
        <p className="weather-card__temp">
          {temp}°{unit}
        </p>
      </div>

      <div className="weather-card__image-wrapper">
        <img
          src={weatherData.image}
          alt={weatherData.condition}
          className="weather-card__image"
        />
      </div>
    </section>
  );
}
