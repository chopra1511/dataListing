import React, { useState } from "react";
import classes from "./HomePage.module.css";

import ItemDetails from "./ItemDetails";
import SupplierDetails from "./SupplierDetails";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../store/dataSlice";

const HomePage = () => {
  const [selected, setSelected] = useState(1);

  const [itemDetails, setItemData] = useState({
    itemName: "",
    quantity: "",
    unitPrice: "",
    currency: "$",
    submissionDate: "",
  });
  const [supplier, setSupplierData] = useState({
    supplierName: "",
    companyName: "",
    countryId: "",
    stateId: "",
    cityId: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
  });
    const [savedData, setSavedData] = useState([]);
    

  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.data);
  console.log(formData);

  const handleSave = () => {
    const combinedData = {
      itemDetails,
      supplier,
    };
    setSavedData([...savedData, combinedData]);
    dispatch(addData(combinedData));
  };

  const checkHandler = (index) => {
    console.log(selected);

    setSelected(index);
  };
  return (
    <>
      <div className={classes.checkbox}>
        <div>
          <input
            type="checkbox"
            checked={selected === 1}
            onChange={() => checkHandler(1)}
          />
          <label>Item</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={selected === 2}
            onChange={() => checkHandler(2)}
          />
          <label>Supplier</label>
        </div>
      </div>
      {selected === 1 && (
        <ItemDetails itemData={itemDetails} setItemData={setItemData} />
      )}
      {selected === 2 && (
        <SupplierDetails
          supplierData={supplier}
          setSupplierData={setSupplierData}
        />
      )}

      <div className={classes.submittedData}>
        <div className={classes.header}>
          <h1>Submitted Data</h1>
          <p>The data submitted by users will be displayed below</p>
          <button className={classes.Savebtn} onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <div className={classes.tableData}>
          <div>
            <h4>Uploaded Data</h4>
            <button>Clear All</button>
          </div>
          <table>
            <thead>
              <tr>
                <td>
                  <input type="checkbox" />
                  <label>Suplier</label>
                </td>
                <td>Item Name</td>
                <td>Quantity</td>
                <td>City</td>
                <td>Country</td>
                <td>Email</td>
                <td>Phone Number</td>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                    <label>{data.supplier.supplierName}</label>
                  </td>
                  <td>{data.supplier.supplierName}</td>
                  <td>{data.itemDetails.quantity}</td>
                  <td>{data.supplier.cityName}</td>
                  <td>{data.supplier.countryName}</td>
                  <td>{data.supplier.email}</td>
                  <td>{data.supplier.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
