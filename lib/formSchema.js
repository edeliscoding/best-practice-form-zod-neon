import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  gender: z.enum(["Male", "Female", "Other"], "Please select a gender"),
  interests: z.array(z.string()).optional(),
  country: z.string().nonempty("Please select a country"),
  dob: z.string().nonempty("Please select a date"),
  tags: z.array(z.string()).optional(),
  message: z.string().max(300, "Message too long").optional(),
})
