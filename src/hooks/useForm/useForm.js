import { useState } from "react";

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback(values);
  };

  const handleChange = event => {
    event.persist();
    setValues(valuesForSet => ({ ...valuesForSet, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit
  };
};

export default useForm;
