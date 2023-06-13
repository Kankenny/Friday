import axios from "axios"

const timelineAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/timeline`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
})

export default timelineAPI
