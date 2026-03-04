import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .max(200, "Bio must be less than 200 characters")
    .optional()
    .or(z.literal("")),

  imageUrl: z
    .any()
    .optional()
    .transform((file) => file?.[0]) // FileList → File
    .refine(
      (file) => {
        if (!file) return true;
        return file.type.startsWith("image/");
      },
      { message: "Invalid file" },
    ),
});
