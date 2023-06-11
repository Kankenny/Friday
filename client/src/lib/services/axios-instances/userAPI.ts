import axios from "axios"

const userAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/user`,
  headers: {
    Authorization: localStorage.getItem("token") || "",
  },
})

export default userAPI
