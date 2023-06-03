import { z } from "zod"
import { strongPasswordRegex } from "../constants/strongPasswordRegex"

export const resetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "New password is required!" })
      .regex(strongPasswordRegex, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be a minimum of 8 characters long.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required!" }),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match!",
        path: ["confirmPassword"],
      })
    }
  })

export type resetPasswordFormType = z.infer<typeof resetPasswordFormSchema>
