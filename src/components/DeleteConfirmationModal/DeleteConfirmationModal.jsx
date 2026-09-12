import Modal from "../Modal/Modal";
import "./DeleteConfirmationModal.css";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  selectedCard,
  isLoading,
}) {
  if (!selectedCard) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-modal">
        <p className="delete-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>

        <div className="delete-modal__buttons">
          <button
            type="button"
            className="delete-modal__confirm"
            onClick={() => onConfirm(selectedCard)}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, delete item"}
          </button>
          <button
            type="button"
            className="delete-modal__cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
