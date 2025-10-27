"use server"

import { currentUser } from "@clerk/nextjs/server"
import { db } from "../../lib/db/index"
import { submissions } from "../../lib/db/schema"
import { formSchema } from "@/lib/formSchema"

export async function submitForm(formData) {
  const user = await currentUser()

  const parsed = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    gender: formData.get("gender"),
    interests: formData.getAll("interests"),
    country: formData.get("country"),
    dob: formData.get("dob"),
    tags: formData.get("tags")?.split(",").map(t => t.trim()).filter(Boolean),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  await db.insert(submissions).values({
    ...parsed.data,
    userId: user?.id,
  })

  return { success: true }
}
