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
      <label className="add-item__label">
        Name
        <input
          type="text"
          name="name"
          className="add-item__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="add-item__label">
        Image (Image URL)
        <input
          type="url"
          name="imageUrl"
          className="add-item__input"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset className="add-item__fieldset">
        <legend className="add-item__legend">Weather</legend>

        <label className="add-item__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="add-item__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="add-item__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
