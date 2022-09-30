import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postData = createAsyncThunk('contact-us/createData', async(request) => {
  try {
    const send = new URLSearchParams(request).toString()
    console.log(send)
    const {data} = await axios.post('http://localhost:8080/contact-us')
    return data
  }catch (e) {
    console.log(e)
  }
})

export const getStoredData = createAsyncThunk('contact-us/getAllData', async({limit, page, keyword, sortType}) => {
  limit = parseInt(limit) || 5
  page = parseInt(page) || 1
  try {
    const query = new URLSearchParams({limit, page, keyword, sortType}).toString()
    const {data} = await axios.get('http://localhost:8080/contact-us?'+query)
    return data
  } catch (e) {
    console.log(e)
  }
})
