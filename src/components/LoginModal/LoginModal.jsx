import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  isLoading,
}) {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange, isFormValid, setValues } =
    useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values, () => setValues(defaultValues));
  };

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText={isLoading ? "Logging in..." : "Log In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isLoading={isLoading}
    >
      <label className="auth-modal__label">
        Email
        <input
          type="email"
          name="email"
          className="auth-modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="auth-modal__label">
        Password
        <input
          type="password"
          name="password"
          className="auth-modal__input"
          value={values.password}
          onChange={handleChange}
          required
          minLength="6"
        />
      </label>

      <button
        type="button"
        className="auth-modal__switch-button"
        onClick={onSwitchToRegister}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}
