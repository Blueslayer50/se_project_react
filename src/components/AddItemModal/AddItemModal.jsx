import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  isLoading,
}) {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const { values, handleChange, isFormValid, setValues } =
    useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values, () => setValues(defaultValues));
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-item"
      buttonText={isLoading ? "Saving..." : "Add garment"}
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
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Weather</legend>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
