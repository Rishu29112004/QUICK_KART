import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema } from "./validations/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../context/authContext";
import emailjs from "@emailjs/browser";
import OtpModal from "./validations/otpModal";
import { toast, Toaster } from "sonner";

const SignupForm = ({ handleLogin, setSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { registerUser } = useAuth();

  const sendOtp = async (email) => {
    if (!email) return toast.error("Email is required");

    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(generatedOtp);

    try {
      await emailjs.send(
        "service_zvyixih",
        "template_khkunem",
        { to_email: email, otp: generatedOtp },
        "eYHieylVZW546CmDN",
      );

      // toast.success("OTP Sent Successfully");
      setShowOtpModal(true);
    } catch (error) {
      console.error("EmailJS error:", error.text || error);
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpSuccess = () => {
    setIsEmailVerified(true);
    setShowOtpModal(false);
    toast.success("Email Verified Successfully");
  };

  const onSubmit = async (data) => {
    if (!isEmailVerified) {
      toast.error("Please verify email first");
      return;
    }

    try {
      await registerUser(data);
      toast.success("Account Created Successfully");
      setSignup(false);
      handleLogin();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const {
    register,
    handleSubmit: formSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  return (
    <>
      {/* This enables toast notifications */}
      <Toaster
        position="bottom-right"
        richColors
        duration={2000}
        reverseOrder={false}
      />

      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <button
              onClick={() => setSignup(false)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </div>

          <form onSubmit={formSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="border px-3 py-2 rounded-md"
              required
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>

            <div className="flex gap-2 w-full">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`border px-3 py-2 rounded-md w-full ${
                  isEmailVerified ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                required
                readOnly={isEmailVerified} // input freeze
              />
              <button
                type="button"
                onClick={() => sendOtp(getValues("email"))}
                className={`px-3 rounded-md text-white ${
                  isEmailVerified
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                disabled={isEmailVerified} // button disable
              >
                {isEmailVerified ? "Verified" : "Verify"}
              </button>
            </div>

            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border px-3 py-2 rounded-md w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 text-white py-2 rounded-md"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleLogin}
              className="text-blue-500 underline font-medium"
            >
              Login
            </button>
          </p>

          {showOtpModal && (
            <OtpModal
              realOtp={otp}
              onSuccess={handleOtpSuccess}
              onClose={() => setShowOtpModal(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SignupForm;
