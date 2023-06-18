import axios from "axios"

const taskAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/task`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
})

export default taskAPI
