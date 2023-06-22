import { z } from "zod"

export const searchFormSchema = z.object({
  query: z.string().trim().toLowerCase(),
})

export type searchFormType = z.infer<typeof searchFormSchema>
