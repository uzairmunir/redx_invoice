import React, { useContext } from "react";
import { FormContext } from "./../context/FormContext";
import currencyFormatter from "currency-formatter";
import Signature from "../fonts/signature.svg";

const Invoice = () => {
  const { formData } = useContext(FormContext);
  const price = formData?.inputFields?.map(
    (data) => Number(data.servicePrice) * Number(data.serviceQuantity)
  );
  let discount = formData?.discount !== "" ? parseInt(formData?.discount) : 0;
  let tax = formData?.tax !== "" ? parseInt(formData?.tax) : 0;
  let total = price?.reduce((acc, item) => (acc += item), 0);
  let discountedPrice = total - (total * discount) / 100;
  let grandTotal = Math.ceil(discountedPrice + (discountedPrice * tax) / 100);

  return (
    <div className="invoice-section">
      <section className="section1">
        <h5>Bill To</h5>
        <h6>{formData?.companyFields.name}</h6>
        <h6>{formData?.companyFields.companyName}</h6>
        <h6>{formData?.companyFields.streetAddress}</h6>
        <h6>{formData?.companyFields.phone}</h6>

        <table className="table table-striped table-bordered mt-3">
          <thead className="thead">
            <tr>
              <th scope="col" width="60%">
                Description
              </th>
              <th scope="col">Qty</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData?.inputFields?.map((data, index) => (
              <tr key={index}>
                <td width="60%">{data?.serviceName}</td>
                <td>{data?.serviceQuantity}</td>
                <td>
                  {data?.servicePrice !== ""
                    ? currencyFormatter.format(Number(data?.servicePrice), {
                        code: "PKR",
                      })
                    : data?.servicePrice}
                </td>
                <td
                  className={`${data.servicePrice === "" ? "hidden" : "show"}`}
                >
                  {currencyFormatter.format(
                    Number(data?.servicePrice) * Number(data?.serviceQuantity),
                    { code: "PKR" }
                  )}
                </td>
              </tr>
            ))}
            {formData.inputFields?.length < 6 ? (
              <>
                <tr>
                  <td width="60%"></td>
                  <td></td>
                  <td></td>
                  <td className="hidden">''</td>
                </tr>
                <tr>
                  <td width="60%"></td>
                  <td></td>
                  <td></td>
                  <td className="hidden">''</td>
                </tr>
                <tr>
                  <td width="60%"></td>
                  <td></td>
                  <td></td>
                  <td className="hidden">''</td>
                </tr>
                <tr>
                  <td width="60%"></td>
                  <td></td>
                  <td></td>
                  <td className="hidden">''</td>
                </tr>
                <tr>
                  <td width="60%"></td>
                  <td></td>
                  <td></td>
                  <td className="hidden">''</td>
                </tr>
              </>
            ) : null}
          </tbody>
        </table>
      </section>
      {formData?.inputFields?.length > 0 && (
        <div className="row mx-0">
          <div className="col-sm-8 px-0">
            <h6>PLEASE MAKE A PAYMENT TO</h6>
            <div className=" d-flex   ">
              <p className="mb-0 total-text ">Beneficiary Name: </p>
              <p
                className="mb-0 total-text text-muted"
                style={{ marginLeft: "65px" }}
              >
                RedxSofts
              </p>
            </div>

            <div className=" d-flex   align-items-end">
              <p className="mb-0 total-text">BeneficiaryAccount No: </p>
              <p
                className="mb-0 total-text text-muted"
                style={{ marginLeft: "32px" }}
              >
                Pk60 MUCB 1189 7193 7100 1717
              </p>
            </div>
            <div className=" d-flex   align-items-end">
              <p className="mb-0 total-text">Bank Name: </p>
              <p
                className="mb-0 total-text text-muted"
                style={{ marginLeft: "105px" }}
              >
                MCB Kharian Cantt
              </p>
            </div>
            <div className=" d-flex   align-items-end">
              <p className="mb-0 total-text">Bank Swift Code: </p>
              <p
                className="mb-0 total-text text-muted"
                style={{ marginLeft: "74px" }}
              >
                MUCBPKKA
              </p>
            </div>

            {/* <div className=" term-condition">
              <h6>Terms And Conditions</h6>
              <p>Please complete the payment with in 30days</p>
              <p>Thank You For Your Business</p>
            </div> */}
          </div>

          <div className="col-sm-4 total-container">
            <div className=" d-flex  justify-content-between align-items-end">
              <p className="mb-0 total-text">Subtotal</p>
              <p className="mb-0 text-muted">
                {currencyFormatter.format(total, { code: "PKR" })}
              </p>
            </div>

            <div className=" d-flex   justify-content-between align-items-end">
              <p className="card-text mb-0 total-text  ">Discount</p>
              <p className="mb-0 text-muted">
                {discount > 0 ? `${discount}%` : 0}
              </p>
            </div>

            <div className=" d-flex   justify-content-between align-items-end">
              <p className="card-text mb-0 total-text ">Taxes</p>
              <p className="mb-0 text-muted">{discount > 0 ? `${tax}%` : 0}</p>
            </div>
            <hr className="mt-0 mb-1" />
            <div className="  d-flex   justify-content-between align-items-end">
              <p className="total-text">Total</p>
              <p className="text-muted">
                {currencyFormatter.format(grandTotal, { code: "PKR" })}
              </p>
            </div>
            <div className="term-signature">
              <img src={Signature} alt="signature" />
              <h6>Regards</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
