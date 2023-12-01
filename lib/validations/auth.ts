import * as z from "zod"

export const authSignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
})

export const authSignUpSchema = z.object({
  name: z.string().min(2, {
    message: "Password must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
})

export const authSchoolCodeSchema = z.object({
  schoolCode: z.string().min(7, {
    message: "School code must be at least 7 characters long",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
})

export const postItemSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  description: z.string(),
  condition: z.enum(["Great condition", "Good condition", "Fair condition"], {
    required_error: "You need to select a condition.",
  }),
  sellingmethod: z.enum(["Free", "Cost"], {
    required_error: "You need to select a value.",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 characters long",
  }).regex(/^\d+$/, {
    message: "Price must be a number",
  }),
  category: z
    .string({
      required_error: "Please select a category.",
    })
})

export const imageSchema = z.object({
  image: z.any(),
});

export const schoolSchema = z.object({
  schoolCode: z.string(),
});

export const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  email: z.string().email(),
  schoolCode: z.string().min(7, {
    message: "School code must be at least 7 characters long",
  }),
  schoolName: z.string()
  })