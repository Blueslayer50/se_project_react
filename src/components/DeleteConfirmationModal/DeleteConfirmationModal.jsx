import "../DeleteConfirmationModal/DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, selectedCard }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal__opened">
      <div className="modal__content delete-modal">
        <button type="button" className="modal__close" onClick={onClose} />

        <h2 className="delete-modal__title">
          Are you sure you want to delete this item?
        </h2>

        <p className="delete-modal__subtitle">This action is irreversible.</p>

        <button
          className="delete-modal__confirm"
          onClick={() => onConfirm(selectedCard)}
        >
          Yes, delete item
        </button>

        <button className="delete-modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
