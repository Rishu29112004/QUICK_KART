// import { Phone } from "lucide-react";
// import React, { useState } from "react";

// const FormExample = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState({
//       name: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError((prev)=>({...prev,[name]:""}))
//   };

//   function validation() {
//     let formError = {};
//     if (!formData.name) {
//       formError.name = "name is requred";
//     }
//     if (!formData.phone) {
//       formError.phone = "phone is requred";
//     }
//     if (!formData.email) {
//       formError.email = "email is requred";
//     }
//     if (!formData.password) {
//       formError.password = "password is requred";
//     }
//     setError(formError)
//     return Object.keys(formError).length===0
//   }

//   const handleSubmit = () => {
//     if(!validation()){
//       return
//     }
//     // console.log(formData)
//   };

//   return (
//     <div className="min-h-screen bg-green-100 flex items-center justify-center">
//       <div className="w-[500px] p-5 rounded-md bg-white flex flex-col gap-5">
//         <div className="flex items-center gap-3">
//           <label htmlFor="name" className="font-bold text-xl w-30">
//             Name:
//           </label>
//           <input
//             value={formData.name}
//             name="name"
//             onChange={(e) => handleChange(e)}
//             type="text"
//             placeholder="write name here..."
//             className="p-2 w-full rounded-md border border-gray-400"
//           />
//         </div>
//         {error.name && <p className="text-red-500">{error.name}</p>}
//         <div className="flex items-center gap-3">
//           <label htmlFor="Phone" className="font-bold text-xl  w-30">
//             Phone:
//           </label>
//           <input
//             value={formData.phone}
//             name="phone"
//             onChange={(e) => handleChange(e)}
//             type="text"
//             placeholder="write name here..."
//             className="p-2 w-full rounded-md border border-gray-400"
//           />
//         </div>
//            {error.phone && <p className="text-red-500">{error.phone}</p>}
//         <div className="flex items-center gap-3">
//           <label htmlFor="Email" className="font-bold text-xl  w-30">
//             Email:
//           </label>
//           <input
//             value={formData.email}
//             name="email"
//             onChange={(e) => handleChange(e)}
//             type="text"
//             placeholder="write name here..."
//             className="p-2 w-full rounded-md border border-gray-400"
//           />
//         </div>
//            {error.email && <p className="text-red-500">{error.email}</p>}
//         <div className="flex items-center gap-3">
//           <label htmlFor="Password" className="font-bold text-xl  w-30">
//             Password:
//           </label>
//           <input
//             value={formData.password}
//             name="password"
//             onChange={(e) => handleChange(e)}
//             type="text"
//             placeholder="write name here..."
//             className="p-2 w-full rounded-md border border-gray-400"
//           />
//         </div>
//            {error.password && <p className="text-red-500">{error.password}</p>}
//         <button
//           onClick={handleSubmit}
//           className="px-4 py-2 w-full bg-blue-500 text-white font-bold text-lg rounded-2xl"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormExample;

import React from "react";
import { useForm } from "react-hook-form";

const FormExample = () => {
  const { register,handleSubmit,formState: { errors }} = useForm();

  const onSubmit = (data) => {
    // Form submission - do nothing, just log for debugging purposes
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] p-5 rounded-md bg-white flex flex-col gap-5"
      >
        {/* Name */}
        <div className="flex items-center gap-3">
          <label className="font-bold text-xl w-30">Name:</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="write name here..."
            className="p-2 w-full rounded-md border border-gray-400"
          />
        </div>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Phone */}
        <div className="flex items-center gap-3">
          <label className="font-bold text-xl w-30">Phone:</label>
          <input
            {...register("phone", { required: "Phone is required" })}
            type="text"
            placeholder="write phone here..."
            className="p-2 w-full rounded-md border border-gray-400"
          />
        </div>
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        {/* Email */}
        <div className="flex items-center gap-3">
          <label className="font-bold text-xl w-30">Email:</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="text"
            placeholder="write email here..."
            className="p-2 w-full rounded-md border border-gray-400"
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Password */}
        <div className="flex items-center gap-3">
          <label className="font-bold text-xl w-30">Password:</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="write password here..."
            className="p-2 w-full rounded-md border border-gray-400"
          />
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 w-full bg-blue-500 text-white font-bold text-lg rounded-2xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormExample;
