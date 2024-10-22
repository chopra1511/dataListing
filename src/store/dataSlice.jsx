import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCountry = createAsyncThunk("country/getCountry", async () => {
  const response = await fetch(
    "https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList"
  );
  const data = await response.json();
  return data.data.countyList;
});

export const getState = createAsyncThunk(
  "state/getState",
  async (countryId) => {
    const response = await fetch(
      `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${countryId}`
    );
    const data = await response.json();
    return data.data.stateList;
  }
);

export const getCity = createAsyncThunk(
  "city/getCity",
  async ({ countryId, stateId }) => {
    const response = await fetch(
      `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${countryId}&stateId=${stateId}`
    );
    const data = await response.json();
    return data.data.cityList;
  }
);

export const addData = createAsyncThunk("add/adddata", async (formdata) => {
  const response = await fetch(
    "https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    }
  );
  const data = await response.json();
  return data.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    formData: [],
    countries: [],
    states: [],
    cities: [],
  },
  reducers: {
    addItemData: (state, action) => {
      state.formData.push(action.payload);
    },
    addSupplierData: (state, action) => {
      state.supData.push(action.payload);
    },
    mergeData: (state) => {
      state.datalist.itemDetails = state.formData[state.formData.length - 1];
      state.datalist.supplierDetails = state.supData[state.supData.length - 1];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(getState.fulfilled, (state, action) => {
      state.states = action.payload;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.cities = action.payload;
    });
      builder.addCase(addData.fulfilled, (state, action) => {
        state.formData.push(action.payload);
      });
  },
});

export const { addItemData, addSupplierData, mergeData } = dataSlice.actions;
export default dataSlice.reducer;
