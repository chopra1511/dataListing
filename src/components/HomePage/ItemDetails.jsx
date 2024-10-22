import React, { useRef, useState } from "react";
import classes from "./ItemDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemData } from "../../store/dataSlice";

const ItemDetails = ({ itemData, setItemData } ) => {
  
    // const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };
    

  

  return (
    <div className={classes.itemDetails}>
      <h1 className={classes.heading}>Item Details</h1>
      <form className={classes.form}>
        <div className={classes.inputDiv}>
          <div>
            <label>Item Name</label>
            <input
              type="text"
              maxLength={50}
              placeholder="Enter item name"
              name="itemName"
              value={itemData.itemName}
              onChange={handleChange}
            />
            <p>Max 50 characters</p>
          </div>

          <div>
            <label>Quantity</label>
            <input
              type="number"
              maxLength={10}
              placeholder="Enter quantity"
              name="quantity"
              value={itemData.quantity}
              onChange={handleChange}
            />
            <p>Numeric value</p>
          </div>

          <div>
            <label>Unit Price</label>
            <input
              type="number"
              maxLength={50}
              placeholder="Enter unit price"
              name="unitPrice"
              value={itemData.unitPrice}
              onChange={handleChange}
            />
            <p>Numeric value (USD)</p>
          </div>

          <div>
            <label>Date of Submission</label>
            <input
              type="date"
              maxLength={50}
              name="submissionDate"
              value={itemData.submissionDate}
              onChange={handleChange}
            />
            <p>Format: DD/MM/YYYY</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemDetails;
