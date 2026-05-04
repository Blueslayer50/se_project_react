import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const filteredItems = weatherData.type
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : clothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}°F / You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
