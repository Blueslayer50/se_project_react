import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card || !card._id) return null;

  const isOpen = activeModal === "preview";
  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose} />

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__left-content">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isLoggedIn && isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
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

export default ItemModal;
