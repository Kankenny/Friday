import axios from "axios"

const cloudinaryAPI = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_URL,
})

export default cloudinaryAPI
