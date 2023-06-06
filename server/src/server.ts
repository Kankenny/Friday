require("dotenv").config()

// Dependencies
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

// Routes
import AuthRoute from "./routes/auth"
import UserRoute from "./routes/user"
import PostRoute from "./routes/post"
import CommentRoute from "./routes/comment"

// Environment Variables
const PORT = process.env.port
const MONGODB_URI = process.env.MONGODB_URI

// Server
const app = express()

// Middlewares
app.use(express.json())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
)

// Route Declarations
app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/post", PostRoute)
app.use("/api/comment", CommentRoute)

mongoose.connect(MONGODB_URI!).then(() => {
  console.log("> Server connected to MongoDB")
  app.listen(PORT, () => {
    console.log(`> Server listening on port ${PORT}`)
  })
})
