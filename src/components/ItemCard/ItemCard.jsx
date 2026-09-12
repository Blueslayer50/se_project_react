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

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <span className="item-card__name">{item.name}</span>

      {isLoggedIn && (
        <button
          type="button"
          className={`item-card__like ${isLiked ? "item-card__like_active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onCardLike({ id: item._id, isLiked });
          }}
          aria-label="Like item"
        />
      )}

      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
    </li>
  );
}
