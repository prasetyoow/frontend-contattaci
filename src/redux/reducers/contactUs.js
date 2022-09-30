import { createSlice } from "@reduxjs/toolkit";
import { getStoredData } from "../asyncActions/contactUs";

const initialState = {
  data: [],
  pageInfo: {},
  errorMsg: null,
  successMsg: null,
  name: '',
  email: '',
  phone_number: '',
  message: '',
}

const contactUs = createSlice({
  name: 'contactUs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStoredData.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
  })
    builder.addCase(getStoredData.fulfilled, (state, action) => {
      state.data = action.payload.results
      state.pageInfo = action.payload.pageInfo
    })
  }
})

export {getStoredData}
export default contactUs.reducer