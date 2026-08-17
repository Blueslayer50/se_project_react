import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onEditProfile,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, isFormValid, setValues } = useForm({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isLoading={isLoading}
    >
      <label className="edit-profile__label">
        Name *
        <input
          type="text"
          name="name"
          className="edit-profile__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="edit-profile__label">
        Avatar *
        <input
          type="url"
          name="avatar"
          className="edit-profile__input"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
