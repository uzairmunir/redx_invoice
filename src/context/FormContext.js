import { createContext, useReducer } from "react";
import FormReducer from "./FormReducer";

let initialState = {
  formData: null,
};

export const FormContext = createContext(initialState);

const FormProvider = ({ children }) => {
  let [state, dispatch] = useReducer(FormReducer, initialState);

  const submitFormData = (formData) => {
    dispatch({
      type: "SUBMIT_DATA",
      payload: formData,
    });
  };

  let stateValue = { submitFormData, ...state };
  return (
    <FormContext.Provider value={stateValue}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
