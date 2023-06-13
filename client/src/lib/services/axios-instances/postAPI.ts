import axios from "axios"

const postAPI = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_SERVER_PORT
  }/api/post`,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
})

export default postAPI
