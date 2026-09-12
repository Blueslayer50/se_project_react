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
      className={`item-modal-overlay ${activeModal === "preview" ? "item-modal-overlay_opened" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="item-modal">
        <button
          type="button"
          className="item-modal__close"
          onClick={onClose}
          aria-label="Close"
        />

        <div className="item-modal__image-wrapper">
          <span className="item-modal__name">{card.name}</span>
          <img
            src={card.imageUrl}
            alt={card.name}
            className="item-modal__image"
          />
        </div>

        <div className="item-modal__info">
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
    </div>
  );
}
