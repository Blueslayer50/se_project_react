import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
  onEditProfile,
  onSignOut,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <Sidebar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <div className="profile__content">
        <div className="profile__header">
          <h1 className="profile__title">Your items</h1>

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

        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </section>
  );
}
