// Dependencies
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Models
import UserModel from "../../../models/User"

// Validators
import { loginFormSchema } from "../../../../../common/validations/loginFormValidator"

export const loginUser = async (req: Request, res: Response) => {
  /* 
	Search DB via the User Schema w/ unique username. 
	Compare the password in the req to encrypted password in the DB.
	*/

  // Validate body using the register form schema
  try {
    loginFormSchema.parse(req.body)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Invalid login form data!",
      data: null,
      ok: false,
    })
  }

  // destructure the payload attached to the body
  const { username, password } = req.body

  try {
    // Check if user exists
    const user = await UserModel.findOne({
      username,
    })
    if (!user)
      return res
        .status(400)
        .json({
          message: "Invalid username or password!",
          data: null,
          ok: false,
        })

    // Check if the password matches
    const doesPasswordMatch = await bcrypt.compare(password, user.password)
    if (!doesPasswordMatch)
      return res
        .status(400)
        .json({
          message: "Invalid username or password!",
          data: null,
          ok: false,
        })

    const token = jwt.sign(
      { _idFromToken: user._id },
      process.env.JWT_KEY as jwt.Secret
    )

    return res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .json({ message: "Login Success!", data: { user, token }, ok: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: `Internal Server Error!: ${error}`,
      data: null,
      ok: false,
    })
  }
}
