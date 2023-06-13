import { z } from "zod"

export const securityAnswerFormSchema = z.object({
  securityAnswer: z
    .string()
    .min(1, { message: "Security answer is required!" })
    .trim()
    .toLowerCase(),
})

export type securityAnswerFormType = z.infer<typeof securityAnswerFormSchema>
