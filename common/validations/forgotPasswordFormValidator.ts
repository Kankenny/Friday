import { z } from "zod"

export const forgotPasswordFormSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: "Username or email field is required!" })
    .trim()
    .toLowerCase(),
})

export type forgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>
