"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/lib/formSchema"
import { submitForm } from "../actions/submitForm"

export default function FormPage() {
  const { user } = useUser()
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")
  const [serverSuccess, setServerSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      gender: "",
      interests: [],
      country: "",
      dob: "",
      tags: [],
      message: "",
    },
  })

  const onSubmit = async (values) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach(v => formData.append(key, v))
      } else {
        formData.append(key, val)
      }
    })
    formData.set("tags", tags.join(","))

    const result = await submitForm(formData)
    if (result.success) {
      reset()
      setTags([])
      setServerSuccess(true)
    }
  }

  const addTag = (e) => {
    e.preventDefault()
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput("")
      setValue("tags", [...tags, tagInput])
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-xl rounded-2xl">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Live Validation Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            {...register("name")}
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <span className="block text-sm font-medium mb-1">Gender</span>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("gender")}
                />
                {opt}
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
        </div>

        {/* Interests */}
        <div>
          <span className="block text-sm font-medium mb-1">Interests</span>
          <div className="flex gap-4 flex-wrap">
            {["Reading", "Coding", "Traveling", "Gaming"].map((interest) => (
              <label key={interest} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={interest}
                  {...register("interests")}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium">Country</label>
          <select {...register("country")} className="w-full p-2 mt-1 border rounded-md">
            <option value="">Select country</option>
            <option>USA</option>
            <option>Philippines</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
          {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
        </div>

        {/* Date of birth */}
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className="w-full p-2 mt-1 border rounded-md"
          />
          {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags (skills, hobbies)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Type and add"
            />
            <button
              onClick={addTag}
              className="px-3 py-1 bg-blue-600 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            {...register("message")}
            className="w-full p-2 mt-1 border rounded-md"
            rows="3"
            placeholder="Write something..."
          ></textarea>
          {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {serverSuccess && (
          <p className="text-green-600 text-sm text-center mt-2">
            ✅ Form submitted successfully!
          </p>
        )}
      </form>
    </div>
  )
}
