import { Mail, Phone, MapPin } from "lucide-react";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_zvyixih", // 👈 your service ID
        "template_cvh12fd", // 👈 your template ID
        {
          name: name,
          email: email,
          message: message,
        },
        "eYHieylVZW546CmDN", // 👈 from EmailJS dashboard
      )
      .then(() => {
        alert("Submitted Successfully ✅");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed ❌");
      });
  };

  return (
    <div className="bg-gray-50  mt-[85px] max-w-7xl mx-auto min-h-screen py-16">
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Have questions or need help? Our team is here for you. Fill out the
          form or reach us directly through the details below.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
              className="border rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="border rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              type="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              rows="5"
              required
              className="border rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-center gap-4">
            <Mail className="text-orange-500" size={28} />
            <div>
              <p className="font-semibold text-lg">Email</p>
              <p className="text-gray-600">support@quickcart.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-orange-500" size={28} />
            <div>
              <p className="font-semibold text-lg">Phone</p>
              <p className="text-gray-600">+92 98765 34213</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-orange-500" size={28} />
            <div>
              <p className="font-semibold text-lg">Address</p>
              <p className="text-gray-600">
                123 QuickCart Street, Bangalore, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
