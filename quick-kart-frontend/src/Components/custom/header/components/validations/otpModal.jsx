import { useState, useRef } from "react";
import { toast, Toaster } from "sonner";

const OtpModal = ({ realOtp, onSuccess, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // sirf numbers allow
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputsRef.current[index + 1].focus(); // next box auto focus
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join("") === String(realOtp)) {
      toast.success("OTP Verified Successfully!"); // ✅ success toast
      onSuccess();
    } else {
      toast.error("Invalid OTP"); // ✅ error toast
    }
  };

  return (
    <>
      {/* Toaster component, yaha bottom-center me show hoga */}
      <Toaster position="bottom-center" />
      <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
        <div className="bg-white p-6 rounded-lg w-[400px] text-center">
          <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
          <p className="text-gray-500 mb-4">We have sent a 4-digit OTP to your email/phone</p>
          
          <div className="flex justify-between mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-lg"
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={verifyOtp} className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
              Verify
            </button>
            <button onClick={onClose} className="flex-1 bg-gray-400 text-white py-2 rounded-md font-medium hover:bg-gray-500 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpModal;
