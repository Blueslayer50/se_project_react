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

  const handleDelete = () => {
    onConfirm(selectedCard);
  };

  return (
    <Modal name="delete-confirmation" isOpen={isOpen} onClose={onClose}>
      <div className="delete-modal">
        <h2 className="delete-modal__title">
          Are you sure you want to delete this item?
        </h2>

        <p className="delete-modal__subtitle">This action is irreversible.</p>

        <div className="delete-modal__buttons">
          <button
            className="delete-modal__confirm"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, delete item"}
          </button>

          <button
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
