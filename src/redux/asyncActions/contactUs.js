import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../helpers/http"
import qs from "qs"

export const postData = createAsyncThunk('contact-us/createData', async(request) => {
  try {
    const send = qs.stringify(request)
    console.log(send + " send dari asyncAction")
    const {data} = await http.post('contact-us', send)
    console.log(data + " data dari async")
    // return data
  }catch (e) {
    console.log(e)
  }
})

export const getStoredData = createAsyncThunk('contact-us/getAllData', async({limit, page, keyword, sortType}) => {
  limit = parseInt(limit) || 5
  page = parseInt(page) || 1
  try {
    const query = new URLSearchParams({limit, page, keyword, sortType}).toString()
    const {data} = await http.get('contact-us?'+query)
    console.log(qs.stringify(data) + ' data dari getalldata')
    return data
  } catch (e) {
    console.log(e)
  }
})

export const editData = createAsyncThunk('contact-us/editData', async ({id, request}) => {
  try {
    const send = qs.stringify(request)
    const {data} = await http.patch('contact-us/'+id, send)
    return data
  } catch (e) {
    console.log(e)
  }
})


export const deleteData = createAsyncThunk('contact-us/deleteData', async ({id}) => {
  try {
    const {data} = await http.delete('/contact-us/'+id)
    return data
  } catch (e) {
    console.log(e)
    return e
  }
})