import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage, form } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsFormValid(form.checkValidity());
  }

  return { values, setValues, handleChange, errors, isFormValid };
}
