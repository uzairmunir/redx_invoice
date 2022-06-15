import React, { useState } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Logo from "../fonts/final-logo.svg";

const Header = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="left-top">
          <div className="d-flex align-items-center">
            <img
              alt="logo"
              src={Logo}
              style={{
                width: "70px",
                padding: "10px 0",
                height: "90px",
                objectFit: "contain",
              }}
            />
            <h3>RedXSofts</h3>
          </div>
          <p>Sadar Bazar I.J Colony</p>
          <p>Kharian Cantt</p>
          <p>District Gujrat</p>
          <p>5700</p>
          <p>Pakistan</p>
        </div>
        <div className="right-top">
          <h3>Invoice</h3>
          <div className="right-top-section mt-3">
            <p>Date</p>
            <DatePicker
              className="date-picker"
              dateFormat="dd-MM-yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="right-top-section">
            <p>Invoice# </p>
            <p className="date-picker">
              {uuidv4().toString().substring(1, 10).toLocaleUpperCase()}
            </p>
          </div>
          <div className="right-top-section">
            <p>DueDate</p>
            <DatePicker
              className="date-picker"
              selected={dueDate}
              dateFormat="dd-MM-yyyy"
              onChange={(date) => setDueDate(date)}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
