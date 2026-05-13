import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, setValues, handleChange, isFormValid } =
    useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values, () => setValues(defaultValues));
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isLoading={isLoading}
    >
      <label htmlFor="item-name" className="modal__label">
        Name
        <input
          id="item-name"
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>

      <label htmlFor="item-image" className="modal__label">
        Image
        <input
          id="item-image"
          type="url"
          className="modal__input"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>

        <label
          htmlFor="weather-hot"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="weather-hot"
            type="radio"
            name="weather"
            checked={values.weather === "hot"}
            value="hot"
            onChange={handleChange}
            className="modal__radio-input"
            required
          />
          Hot
        </label>

        <label
          htmlFor="weather-warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="weather-warm"
            type="radio"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Warm
        </label>

        <label
          htmlFor="weather-cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="weather-cold"
            type="radio"
            name="weather"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
