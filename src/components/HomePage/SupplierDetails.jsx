import React, { useEffect, useState } from "react";
import classes from "./SupplierDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSupplierData,
  getCity,
  getCountry,
  getState,
} from "../../store/dataSlice";

const SupplierDetails = ({ supplierData, setSupplierData }) => {
  const [selectedCountry, setCountry] = useState("");
  const [selectedState, setState] = useState("");
  const [selectedCity, setCity] = useState("");

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  const dispatch = useDispatch();
  const { countries, states, cities } = useSelector((state) => state.data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const countryhandler = (e) => {
    const countryId = e.target.value;
    setCountry(countryId);
    setSupplierData({
      ...supplierData,
      countryId: countryId, 
    });
    dispatch(getState(countryId));
  };

  const statehandler = (e) => {
    const stateId = e.target.value;
    setState(stateId);
    setSupplierData({
      ...supplierData,
      stateId: stateId,
    });
    dispatch(getCity({ countryId: selectedCountry, stateId }));
  };

  const cityhandler = (e) => {
    const cityId = e.target.value;
    setCity(cityId);
    setSupplierData({
      ...supplierData,
      cityId: cityId, 
    });
  };

  return (
    <div className={classes.supplierDetails}>
      <h1 className={classes.heading}>Supplier Details</h1>
      <form className={classes.form}>
        <div className={classes.inputDiv}>
          <div>
            <label>Supplier Name</label>
            <input
              type="text"
              maxLength={50}
              placeholder="Enter item name"
              name="supplierName"
              value={supplierData.supplierName}
              onChange={handleChange}
            />
            <p>Max 50 characters</p>
          </div>

          <div>
            <label>Company Name</label>
            <input
              type="text"
              maxLength={50}
              placeholder="Enter quantity"
              name="companyName"
              value={supplierData.companyName}
              onChange={handleChange}
            />
            <p>Max 50 characters</p>
          </div>

          <div>
            <label>Country</label>
            <select
              name="countryId"
              value={selectedCountry}
              onChange={countryhandler}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((c) => (
                <option key={c.countryId} value={c.countryId}>
                  {c.name}
                </option>
              ))}
            </select>
            <p>Select country from the list</p>
          </div>

          <div>
            <label>State</label>
            <select
              name="stateId"
              value={selectedState}
              onChange={statehandler}
            >
              <option value="" disabled>
                Select a State
              </option>
              {states.map((s) => (
                <option key={s.stateId} value={s.stateId}>
                  {s.name}
                </option>
              ))}
            </select>
            <p>Select state from the list</p>
          </div>

          <div>
            <label>City</label>
            <select name="cityId" value={selectedCity} onChange={cityhandler}>
              <option value="" disabled>
                Select a City
              </option>
              {cities.map((c) => (
                <option key={c.cityId} value={c.cityId}>
                  {c.name}
                </option>
              ))}
            </select>
            <p>Select city from the list</p>
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              name="email"
              value={supplierData.email}
              onChange={handleChange}
            />
            <p>Valid Email format</p>
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={supplierData.phoneNumber}
              onChange={handleChange}
            />
            <p>Valid Phone number</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SupplierDetails;
