import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
}) {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange, isFormValid, setValues } =
    useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values, () => setValues(defaultValues));
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
          minLength="6"
        />
      </label>
    </ModalWithForm>
  );
}
