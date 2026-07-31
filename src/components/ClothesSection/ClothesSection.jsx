import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems = [],
  handleCardClick,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__your-items">Your Items</p>

        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
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
    </div>
  );
}
