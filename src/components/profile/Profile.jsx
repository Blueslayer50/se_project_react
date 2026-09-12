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
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}
