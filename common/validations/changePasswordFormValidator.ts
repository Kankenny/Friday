import { z } from "zod"
import { strongPasswordRegex } from "../constants/strongPasswordRegex"

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(1).regex(strongPasswordRegex, {
      message:
        "New password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be a minimum of 8 characters long. ",
    }),
    newConfirmPassword: z.string().min(1),
  })
  .superRefine(({ newPassword, newConfirmPassword }, ctx) => {
    if (newPassword !== newConfirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password does not match!",
        path: ["newConfirmPassword"],
      })
    }
  })

export type changePasswordFormType = z.infer<typeof changePasswordFormSchema>
