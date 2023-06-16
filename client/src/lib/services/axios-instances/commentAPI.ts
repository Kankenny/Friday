import axios from "axios"

const commentAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/comment`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
})

export default commentAPI
