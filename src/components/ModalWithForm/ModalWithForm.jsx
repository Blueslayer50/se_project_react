import Modal from "../Modal/Modal";
import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  isLoading,
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <div className="modal-form">
        <h2 className="modal-form__title">{title}</h2>
        <form
          className="modal-form__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className="modal-form__submit"
            disabled={!isFormValid || isLoading}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </Modal>
  );
}
