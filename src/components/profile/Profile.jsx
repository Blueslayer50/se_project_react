import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
  onSignOut,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <div className="profile__header">
        <button type="button" className="profile__edit" onClick={onEditProfile}>
          Edit profile
        </button>

        <button type="button" className="profile__logout" onClick={onSignOut}>
          Log out
        </button>
      </div>

      {isLoggedIn && (
        <button type="button" className="profile__add" onClick={handleAddClick}>
          + Add clothes
        </button>
      )}

      <ul className="profile__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </section>
  );
}
