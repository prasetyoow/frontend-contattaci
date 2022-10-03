import { createSlice } from "@reduxjs/toolkit";
import { getStoredData, postData, editData } from "../asyncActions/contactUs";

const initialState = {
  data: [],
  pageInfo: {},
  errorMsg: null,
  successMsg: null,
  id: '',
  name: '',
  email: '',
  message: '',
}

const contactUs = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    resetMsg: state => {
      state.successMsg = null;
      state.errorMsg = null;
      state.data = [];
    },
  },
  editId: (state, action) => {
    state.id = action.payload;
  },
  editName: (state, action) => {
    state.name = action.payload;
  },
  editEmail: (state, action) => {
    state.email = action.payload;
  },
  editMessage: (state, action) => {
    state.message = action.payload;
  },
  extraReducers: (builder) => {
    builder.addCase(postData.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    })
    builder.addCase(postData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.pageInfo = action.payload.pageInfo;
    })
    builder.addCase(getStoredData.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
  })
    builder.addCase(getStoredData.fulfilled, (state, action) => {
      state.data = action.payload.results
      state.pageInfo = action.payload.pageInfo
    })
    builder.addCase(editData.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    })
    builder.addCase(editData.fulfilled, (state, action) => {
      state.successMsg = action.payload.message
    })
  }
})

export const { resetMsg, editId, editName, editEmail, editMessage } = contactUs.actions;
export {getStoredData}
export default contactUs.reducer