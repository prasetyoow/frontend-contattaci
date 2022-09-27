import axios from "axios";

axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default axios;