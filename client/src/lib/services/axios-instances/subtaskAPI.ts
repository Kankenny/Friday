import axios from "axios"

const subtaskAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/subtask`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
})

export default subtaskAPI
