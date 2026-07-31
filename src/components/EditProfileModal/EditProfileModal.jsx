import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onEditProfile,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, isFormValid, setValues } =
    useForm(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText={isLoading ? "Saving..." : "Save"}
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
    </ModalWithForm>
  );
}
