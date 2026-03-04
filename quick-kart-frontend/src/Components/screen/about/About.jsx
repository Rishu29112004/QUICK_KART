import React from "react";

const emp = [
  {
    id: 1,
    img: "https://t4.ftcdn.net/jpg/07/89/21/05/360_F_789210561_sanXtFYguHheV6yIPK23z8sMBsQYyV3Q.jpg",
    name: "Shi Sharma",
    position: "Founder & CEO",
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJn5xtWC54qfHGzhV-mWkR7B_Drp8NmtsWpBImPEnR_UDyJlO1BY1ItzO66mMLOJjVw-k&usqp=CAU",
    name: "Dome Luice",
    position: "CTO",
  },
  {
    id: 3,
    img: "https://www.shutterstock.com/image-photo/arms-crossed-lawyer-portrait-happy-600nw-2328854645.jpg",
    name: "Lee Lorem",
    position: "Marketing Head",
  },
];
const About = () => {
  return (
    <div className="min-h-screen  mt-[85px] max-w-7xl mx-auto">
      <div className="flex flex-col mt-10 gap-10 rounded-md">
        <div className="bg-orange-400 h-50 gap-3 flex rounded-md flex-col items-center justify-center">
          <p className="text-white font-bold text-3xl">About Us</p>
          <p className="text-white">
            Welcome to <span className="font-bold">QuickCart</span> - you
            one-stop destination for quality products at unbeatable prices.
          </p>
        </div>
        <div className="flex items-center">
          <div className="w-1/2 flex justify-center">
            <img
              className="h-100 w-100 rounded-2xl"
              src="https://img.us.news.samsung.com/us/wp-content/uploads/2024/06/12163632/samsung-galaxy-watch-fe.jpg"
              alt=""
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2 justify-start">
            <p className="font-bold text-2xl">Who We Are</p>
            <p className="text-gray-700">
              QuickCart is built with a vision to simplify shopping for
              everyone. We aim to provide a seamless online experience with dast
              delivery, trusted ssellers, and top-notch products. Our platform
              connects custimers with a variety of categories, ensuring
              convenience and satisfaction every time you shop.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 md:px-10">
          {/* Mission */}
          <div className="border rounded-2xl px-5 py-10 flex flex-col h-full">
            <p className="text-orange-500 pb-1 font-bold text-lg">
              Our Mission
            </p>
            <p className="text-gray-700 flex-grow">
              To create an easy and enjoyable shopping journey by offering
              quality products, excellent customer service, and reliable
              delivery at your fingertips.
            </p>
          </div>

          {/* Vision */}
          <div className="border rounded-2xl px-5 py-10 flex flex-col h-full">
            <p className="text-orange-500 font-bold text-lg pb-1">Our Vision</p>
            <p className="text-gray-700 flex-grow">
              To be the most trusted e-commerce brand, empowering both customers
              and sellers through technology and innovation.
            </p>
          </div>
        </div>

        <div className="bg-gray-200 py-10 my-10">
          {/* Title */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="text-center font-bold text-3xl">Meet Our Team</h2>
            <div className="w-54 h-1 bg-orange-500 rounded-full"></div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 md:px-12">
            {emp.map((t) => (
              <div
                key={t.id}
                className="group bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-orange-100 group-hover:border-orange-400 transition duration-300"
                    src={t.img}
                    alt={t.name}
                  />
                </div>

                {/* Name */}
                <p className="font-semibold text-xl text-gray-800 mt-5">
                  {t.name}
                </p>

                {/* Position */}
                <p className="text-gray-500 text-sm mt-1 tracking-wide">
                  {t.position}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-1 bg-orange-500 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
