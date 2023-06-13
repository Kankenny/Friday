import axios from "axios"

const authAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/auth`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
})

export default authAPI
