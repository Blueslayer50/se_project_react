import "./ItemModal.css";

export default function ItemModal({
  activeModal,
  card,
  onClose,
  onDeleteClick,
  isLoggedIn,
  currentUser,
}) {
  if (!card) return null;

  const isOwner = isLoggedIn && card.owner === currentUser._id;

  return (
    <div
      className={`item-modal-overlay ${
        activeModal === "preview" ? "item-modal-overlay_opened" : ""
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="item-modal">
        <button type="button" className="item-modal__close" onClick={onClose} />

        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />

        <p className="item-modal__title">{card.name}</p>
        <p className="item-modal__weather">Weather: {card.weather}</p>

        {isOwner && (
          <button
            type="button"
            className="item-modal__delete"
            onClick={() => onDeleteClick(card)}
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}
