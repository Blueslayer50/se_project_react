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
      className={`modal modal_type_preview ${
        activeModal === "preview" ? "modal_opened" : ""
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__container-preview">
        <button type="button" className="modal__close" onClick={onClose} />

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__info">
          <p className="modal__name">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isOwner && (
            <button
              type="button"
              className="modal__delete-button"
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
