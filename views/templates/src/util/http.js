import axios from "axios"
import {
  Message
} from "element-ui"
import props from "./properties"

const http = axios.create({
  baseURL: props.server,
  timeout: 5000
})

//request 拦截
//TODO

//response 拦截
http.interceptors.response.use(res => {
  const resData = res.data
  if (resData.code && resData.code !== 200) {
    Message({
      message: data.message || "网络错误，请稍后重试！",
      type: "error"
    })
  } else {
    return res.data
  }
}, error => {
  console.log(error)
  Message({
    type: "error",
    message: error.message
  })
})

export default http
