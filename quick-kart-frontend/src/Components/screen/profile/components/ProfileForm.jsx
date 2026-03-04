import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../../screen/profile/components/ProfileSchema";

const ProfileForm = ({ setOpenProfile, onUpdate, defaultValues }) => {
  const [preview, setPreview] = useState(defaultValues?.imageUrl || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  // 🔥 Prevent memory leak for preview
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;

      // 🔥 If file input (FileList)
      if (value instanceof FileList) {
        if (value.length > 0) {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    await onUpdate(formData);
    setOpenProfile(false);

  } catch (err) {
    alert("Profile update failed");
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button
            onClick={() => setOpenProfile(false)}
            className="text-red-500 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          )}

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            {...register("imageUrl")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="border px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.imageUrl?.message}</p>

          {/* Name */}
          <input
            {...register("name")}
            placeholder="Name"
            className="border px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          {/* Email */}
          <input
            {...register("email")}
            type="email"
            readOnly
            className="border px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          {/* Phone */}
          <input
            {...register("phone")}
            placeholder="Phone"
            className="border px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>

          {/* Bio */}
          <textarea
            {...register("bio")}
            placeholder="Bio"
            className="border px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.bio?.message}</p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProfileForm;