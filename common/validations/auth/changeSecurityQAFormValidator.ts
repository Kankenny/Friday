import { z } from "zod"

export const changeSecurityQAFormSchema = z.object({
  password: z.string().min(1),
  newSecurityQuestion: z.string().min(1),
  newSecurityQAnswer: z.string().min(1).toLowerCase().trim(),
})

export type changeSecurityQAFormType = z.infer<
  typeof changeSecurityQAFormSchema
>
