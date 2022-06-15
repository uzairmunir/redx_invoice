const FormReducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_DATA": {
      return {
        ...state,
        formData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default FormReducer;
