// Dependencies
import { Request, Response } from "express"
import bcrypt from "bcrypt"

// Models
import UserModel from "../../../models/User"

// Validators
import { registerFormSchema } from "../../../../../common/validations/auth/registerFormValidator"

export const registerUser = async (req: Request, res: Response) => {
  // Validate body using the register form schema
  try {
    registerFormSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Invalid register form data!",
      data: null,
      ok: false,
    })
  }

  // destructure the payload attached to the body
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    securityQuestion,
    securityAnswer,
  } = req.body

  try {
    const salt = await bcrypt.genSalt()

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, salt)

    // Hashing securityAnswer
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, salt)

    // Check if the username or email already exists in the db
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    })
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists!",
        data: null,
        ok: false,
      })
    }

    // Creating new User
    const user = new UserModel({
      firstName,
      lastName,
      profilePicture: "",
      email,
      username,
      password: hashedPassword,
      securityQuestion,
      securityAnswer: hashedSecurityAnswer,
      following: [],
      followers: [],
      blocked: [],
      posts: [],
      upvotedPosts: [],
      downvotedPosts: [],
      savedPosts: [],
      authorizedPosts: [],
      comments: [],
    })

    // Saving new User
    const registeredUser = await user.save()
    res.status(200).json({
      message: "User successfully registered!",
      data: registeredUser,
      ok: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
