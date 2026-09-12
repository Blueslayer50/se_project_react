import "./WeatherCard.css";

export default function WeatherCard({ weatherData, currentTemperatureUnit }) {
  const temp = weatherData.temp[currentTemperatureUnit];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
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
