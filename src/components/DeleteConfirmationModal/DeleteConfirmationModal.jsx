function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  selectedCard,
  isLoading,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose} />

        <p className="modal__caption">
          Are you sure you want to delete this item?
        </p>

        <div className="modal__footer">
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => onConfirm(selectedCard)}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>

          <button type="button" className="modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
