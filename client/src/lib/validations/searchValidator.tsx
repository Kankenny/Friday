import { z } from "zod"

export const searchFormSchema = z.object({
  query: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "The query field is required!" }),
})

export type searchFormType = z.infer<typeof searchFormSchema>
