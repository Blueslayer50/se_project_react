import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        <h1 className="clothes-section__title">Your items</h1>
        {isLoggedIn && (
          <button
            type="button"
            className="clothes-section__add-button"
            onClick={handleAddClick}
          >
            + Add new
          </button>
        )}
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
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
  );
}
