import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.includes(currentUser._id);

  const handleLike = () => {
    if (!isLoggedIn) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <div className="item-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />

      <div className="item-card__footer">
        <p className="item-card__name">{item.name}</p>

        {isLoggedIn && (
          <button
            type="button"
            className={`item-card__like ${isLiked ? "item-card__like_active" : ""}`}
            onClick={handleLike}
          />
        )}
      </div>
    </div>
  );
}
