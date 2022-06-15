import React, { useContext, useState } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import { FormContext } from "./../context/FormContext";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [companyFields, setCompanyFields] = useState({
    name: "",
    companyName: "",
    streetAddress: "",
    phone: "",
  });
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), serviceName: "", serviceQuantity: "", servicePrice: "" },
  ]);
  const [tax, setTax] = useState("");
  const [discount, setDiscount] = useState("");
  const { submitFormData } = useContext(FormContext);
  const navigate = useNavigate();

  // Function to Handle Company Fields Change
  const handleCompanyChange = (e) => {
    setCompanyFields({ ...companyFields, [e.target.name]: e.target.value });
  };
  // Function to handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    submitFormData({ companyFields, inputFields, tax, discount });
    setCompanyFields({
      name: "",
      companyName: "",
      streetAddress: "",
      phone: "",
    });
    setInputFields([
      {
        id: "",
        serviceName: "",
        serviceQuantity: "",
        servicePrice: "",
      },
    ]);
    navigate("/invoice");
  };

  // Function To Handle Services Input Change
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };
  // Function To add Service Input
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), serviceName: "", serviceQuantity: "", servicePrice: "" },
    ]);
  };
  // Function To remove Service Input
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };
  return (
    <div>
      <section className="section1">
        <h5>Bill To</h5>
        <form className="form mt-2" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group  col-sm-6">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                value={companyFields.name}
                name="name"
                type="text"
                className="form-control"
                onChange={handleCompanyChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group  col-sm-6">
              <label htmlFor="exampleInputEmail1">Company Name</label>
              <input
                onChange={handleCompanyChange}
                value={companyFields.companyName}
                name="companyName"
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group  col-sm-6">
              <label htmlFor="exampleInputEmail1">Street Address</label>
              <input
                type="text"
                onChange={handleCompanyChange}
                value={companyFields.streetAddress}
                name="streetAddress"
                className="form-control"
                placeholder="Enter Street Address"
              />
            </div>
            <div className="form-group  col-sm-6">
              <label htmlFor="exampleInputEmail1">Phone</label>
              <input
                onChange={handleCompanyChange}
                value={companyFields.phone}
                name="phone"
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
          <div className="services-header">
            <h5 className="py-2">Add Services</h5>
            <i
              className="fa fa-plus icon-plus add-btn"
              onClick={handleAddFields}
              aria-hidden="true"
            />
          </div>

          {inputFields?.map((inputField) => (
            <div key={inputField.id} className="row align-items-center">
              <div className="form-group  col-sm-4">
                <input
                  className="form-control "
                  placeholder="Service Name"
                  name="serviceName"
                  value={inputFields.serviceName}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                <input
                  name="serviceQuantity"
                  className="form-control"
                  placeholder="Service Quantity"
                  value={inputFields.serviceQuantity}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </div>
              <div className="form-group col-sm-3">
                <input
                  type="text"
                  name="servicePrice"
                  className="form-control"
                  placeholder="Service Price"
                  value={inputFields.servicePrice}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
              </div>
              <div className="col-sm-1">
                <i
                  className="fa fa-times delete-btn"
                  onClick={handleRemoveFields}
                />
              </div>
            </div>
          ))}

          {inputFields.length > 0 && (
            <>
              <div className="row">
                <div className="form-group col-sm-6">
                  <input
                    type="text"
                    name="discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="form-control"
                    placeholder="Discount in Percentage"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <input
                    type="text"
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                    name="tax"
                    className="form-control"
                    placeholder="Tax in Percentage"
                  />
                </div>
              </div>
              <button type="submit" className="btn submit-btn">
                Submit
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  );
};

export default Form;
