import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );

  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={userItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
