import React from "react";
import Button from "../components/Button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/Card";
import { FileText, BookOpen, BarChart3, Rocket } from "lucide-react";
import '../css/Home.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import book1 from "../pics/Book1-Front.png"
import book2 from "../pics/Book1-Page.jpg"
import ylys from "../pics/ylys.png"
import icon1 from "../pics/Aicon1.png"
import icon2 from "../pics/Gicon3.png"
import icon3 from "../pics/Bicon2.png"
import icon4 from "../pics/Ficon4.png"
import yellowcicle from "../pics/yellowcircle.png"
import whoarewe from "../pics/whoarewe.jpeg"
import Spline from '@splinetool/react-spline';


export default function Home() {
  const cards = [
    {
      icon: <FileText className="mx-auto mb-4 h-10 w-10 text-black" />,
      title: "Understand Your Stage of Life",
      desc: "Personalized insights for growth",
    },
    {
      icon: <BookOpen className="mx-auto mb-4 h-10 w-10 text-black" />,
      title: "Learn Through Tailored Content",
      desc: "Focused learning modules",
    },
    {
      icon: <BarChart3 className="mx-auto mb-4 h-16 w-10 text-black" />,
      title: "Result-Driven Approach",
      desc: "Practical strategies for success",
    },
    {
      icon: <Rocket className="mx-auto mb-4 h-10 w-10 text-black" />,
      title: "Grow With Platform Support",
      desc: "Community and mentorship",
    },
  ]
    const books = [
    {
      img: book1,
      title: "Guiding Lights",
      subtitle: "Gate of Knowledge (Vol-1)",
    },
    {
      img: book2,
      title: "Guiding Lights",
      subtitle: "Gate of Knowledge (Vol-2)",
    },
    {
      img: "/images/book3.jpg",
      title: "Path to Success",
      subtitle: "Growth Mindset",
    },
  ];
const items = [
  { icon: icon1, title: "Academic" },
  { icon: icon2, title: "Businesses & Companies" },
  { icon: icon3, title: "Online Educational Platforms" },
  { icon:  icon4, title: "Families & Individuals" },
];
  const controls = useAnimation();
  const textControls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });
 const [inView2, setInView] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    const section = document.getElementById("stay-connected");
    if (section) {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
      if (isVisible) setInView(true);
      else setInView(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  if (inView) {
    // 🔹 Trigger animation when in view
    textControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  } else {
    // 🔹 Reset when out of view
    textControls.start({ opacity: 0, y: 30 });
    controls.start({ opacity: 0, x: 200, y: -200 });
  }
}, [inView, textControls, controls]);


  return (
    <div>
     {/* Hero Section */}
<section className="relative flex bg-black flex-col md:flex-row items-center justify-between px-10 py-24 overflow-hidden">

  {/* 🔹 Background Spline Animation */}
  <div className="absolute inset-0 z-0">
    <Spline scene="https://prod.spline.design/j5zobmBEiVzLPVLu/scene.splinecode" />
  </div>

  {/* LEFT SIDE — Text Content */}
  <div className="z-10 max-w-lg text-center md:text-left">
    <h4 className="text-5xl font-modum font-bold text-white leading-none tracking-wide">
      PRACTICAL GUIDANCE <br /> FOR EVERY STAGE,
    </h4>

    <p className="mt-4 text-xl uppercase font-modum bg-white border-2 border-black inline-block px-4 py-1 tracking-wider">
      Timeless Wisdom for Modern Challenges
    </p>

    <p className="mt-4 text-white text-lg leading-relaxed text-justify">
      Helping you live a balanced, fulfilling life in harmony with the
      teachings of respected Islamic scholars and educators.
    </p>

    <Button className="mt-6 bg-brand text-black rounded-xl hover:bg-white hover:text-black active:bg-black active:text-brand transition-all duration-300">
      Read More
    </Button>
  </div>

</section>

  {/* WHO ARE WE SECTION */}
<section
  ref={ref}
  className="px-16 py-16 bg-white relative flex flex-col md:flex-row items-center justify-between overflow-hidden"
>
  {/* Left Section (Text) */}
  <motion.div
    className="max-w-3xl md:w-1/2 z-10"
    initial={{ opacity: 0, y: 30 }}
    animate={textControls}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h3 className="text-5xl font-modum font-bold mb-4 tracking-wide">
      WHO ARE WE
    </h3>
    <p className="text-gray-600 leading-relaxed text-justify max-w-screen-sm tracking-wide">
      Alnoor Edtech helps you to live a balanced, fulfilling life in
      harmony with the teachings of respected Islamic scholars and
      educators without overwhelming your learning. From making choices
      with strong values, to nurturing a life in harmony, to enhancing
      crucial life skills, our courses, guide books, and resources bring
      wisdom into your everyday life.
    </p>

    <Button className="mt-6 bg-brand text-black rounded-xl hover:bg-black hover:text-yellow-500 active:bg-black active:text-yellow-500 transition-all duration-300">
      Read More
    </Button>
  </motion.div>

  {/* Center Image */}
  <motion.div
    className="md:w-42 relative flex justify-center items-center z-20 -ml-5 mt-10 md:mt-0"
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    animate={textControls}
    transition={{ duration: 0.9, ease: "easeOut" }}
  >
    <motion.img
      src={whoarewe}
      alt="Who are We"
      className="w-68  h-60 rounded-lg object-cover shadow-lg ml-4"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 120 }}
    />
  </motion.div>

  {/* Animated Yellow Circle */}
  <motion.div
    className="hidden md:block w-72 h-72 bg-brand rounded-full absolute opacity-90 blur-sm"
    initial={{ x: 500, y: -200, opacity: 0, scale: 0.8 }}
    animate={{
      x: 0,
      y: 0,
      opacity: 1,
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    style={{ right: "10%", top: "20%" }}
  />
</section>


  <section className="relative px-8 md:px-16 py-16 bg-brand text-center md:text-left overflow-hidden">
      {/* Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl font-bold font-modum mb-8 tracking-wide"
      >
        YOUR LIFE, YOUR STAGE
      </motion.h3>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="-mt-4 mb-12 text-gray-800 max-w-xl"
      >
        Alnoor Edtech helps you to live a balanced, fulfilling life in harmony.
      </motion.p>

      {/* Image */}
      <motion.img
        src={ylys}
        alt="Your Life, Your Stage"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: false }}
        className="mx-auto md:mx-0 rounded-3xl shadow-lg"
      />
    </section>

<div
  className="h-[60vh] relative"
  style={{
    background: "linear-gradient(to bottom, #facc15 30%, #ffffff 30% 100%)"
  }}
>
  <div className="relative max-w-5xl w-full px-8 md:px-16 py-8  rounded-[40px] border-2 border-black shadow-md
 top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white ">
    <h3 className="text-3xl md:text-4xl font-modum font-bold mb-4 tracking-wide">
      WHY WE’RE UNIQUE
    </h3>
    <p className="text-gray-700 max-w-2xl leading-relaxed ">
      Most platforms only focus on academics or one specific mode of life.
      Our strength lies in blending values, knowledge, and modern tools
      to guide you meaningfully at every stage.
    </p>
  </div>
</div>

  <motion.section
      className="px-8 py-16 bg-[#faf7f2] flex flex-col md:flex-row items-center gap-10 ml-8 overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      {/* ================= LEFT CONTENT ================= */}
      <motion.div
        className="flex-1"
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl md:text-5xl font-modum font-bold mb-4 tracking-wide">
          AN OPEN FOR ALL PLATFORM
        </h3>

        <p className="text-gray-700 text-justify mb-6 leading-relaxed max-w-md">
          AlNoor Edtech is built on inclusivity. While our foundation is inspired
          by Islamic teachings, our lessons carry values that resonate with people
          of every faith and background. This makes us not just a platform, but a
          bridge where diverse people come together to learn, grow, and share.
        </p>

        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: 1,
            transition: { type: "spring", stiffness: 120 },
          }}
        >
          <Button className="mt-6 bg-brand text-black rounded-xl hover:bg-black hover:text-yellow-500 active:bg-black active:text-yellow-500 transition-all duration-300">
            Start Learning With Us
          </Button>
        </motion.div>
      </motion.div>

      {/* ================= RIGHT CONTENT (Swiper Carousel) ================= */}
      <motion.div
        className="flex-1 w-full max-w-lg"
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 150, damping: 12 },
          }}
          className="rounded-lg shadow-xl"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-lg"
          >
            {books.map((book, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative">
                  <motion.img
                    src={book.img}
                    alt={book.title}
                    className="w-full h-[350px] object-cover rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-md shadow">
                    <p className="text-sm font-semibold">{book.title}</p>
                    <p className="text-gray-600 text-xs">{book.subtitle}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>
    </motion.section>
<section className="bg-black text-white  px-14 scroll py-20 -pb-6 overflow-hidden">
  <div className="flex flex-col md:flex-row items-start justify-between ">
    
    {/* LEFT TEXT SECTION */}
    <div className="max-w-md text-left flex flex-col justify-between ">
      <div>
        <h3 className="text-white font-modum text-5xl tracking-wide leading-none mb-6">
          THE ALNOOR EDTECH IS <br /> OPEN FOR SUPPORT
        </h3>

        <h3 className="border border-white py-2 mb-6 w-fit px-4 text-xl font-modum">
          VOLUNTEERS, PARTNERSHIPS AND COLLABORATIONS
        </h3>

        <p className="text-gray-300 leading-relaxed text-justify max-w-sm">
          We so opinion friends me message as delight. Whole
          front do of plate heard oh ought. His defective nor convinced residence own.
        </p>
      </div>
    </div>

    {/* RIGHT ICON GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-end">
  {items.map((item, idx) => (
    <motion.div
      key={idx}
      className="relative w-36 h-36 flex items-center justify-center cursor-pointer"
      initial={{ x: -150, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      whileHover={{
        rotateY: 180,
        scale: 0.9,
      }}
      transition={{
        duration: 0.8,
        delay: idx * 0.2,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.3 }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Yellow Circle Background */}
      <motion.img
        src={yellowcicle}
        alt="yellow circle"
        className="absolute w-full h-full object-contain"
        whileHover={{
          rotate: 20,
          scale: 1.05,
          transition: { type: "spring", stiffness: 120 },
        }}
      />

      {/* White Circle */}
      <motion.div
        className="relative w-28 h-28 bg-white rounded-full shadow-md flex flex-col items-center justify-center text-black"
        whileHover={{
          scale: 1.05,
          rotateY: 180,
          transition: { duration: 0.6 },
        }}
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <motion.img
          src={item.icon}
          alt={item.title}
          className="w-7 h-7 object-contain"
          whileHover={{ scale: 1.2 }}
        />
        <p className="mt-2 text-[11px] font-semibold text-center">
          {item.title}
        </p>
      </motion.div>
    </motion.div>
  ))}
</div>


</div>
</section>

<section id="stay-connected">
      <div className="relative bg-brand overflow-hidden">
        {/* Yellow Top Section */}
        <div className="h-48 bg-brand"></div>

        {/* White + Black Curve */}
        <div className="relative">
          <svg
            className="absolute top-[-1px] left-0 w-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Black Line (base) */}
            <path
              d="M0,96L60,117.3C120,139,240,181,360,197.3C480,213,600,203,720,176C840,149,960,107,1080,117.3C1200,128,1320,192,1380,224L1440,256"
              stroke="black"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Animated White Glow */}
            <motion.path
              d="M0,96L60,117.3C120,139,240,181,360,197.3C480,213,600,203,720,176C840,149,960,107,1080,117.3C1200,128,1320,192,1380,224L1440,256"
              stroke="white"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="200 1000"
              strokeDashoffset="1000"
              animate={
                inView2
                  ? {
                      strokeDashoffset: [1000, -1000],
                      opacity: [0.2, 1, 0.2],
                      transition: {
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                      },
                    }
                  : {}
              }
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-10 px-4 pb-16 -mt-32">
          <h3 className="text-2xl tracking-wide md:text-5xl font-modum font-bold mb-12">
            STAY CONNECTED, KEEP GROWING
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
            {/* Left Circle */}
            <div className="relative">
              <div className="w-60 h-60 bg-white rounded-full shadow-lg flex items-center justify-center p-8 text-center">
                <p className="text-sm">
                  <b>Subscribe</b>
                  <br /> to receive weekly tips, free guides, and updates on new
                  courses—delivered straight to your inbox
                </p>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                <button className="bg-brand text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 px-6 py-2 font-bold shadow-md">
                  SUBSCRIBE
                </button>
              </div>
            </div>

            {/* Right Circle */}
            <div className="relative">
              <div className="w-60 h-60 bg-white rounded-full shadow-lg flex items-center justify-center p-8 text-center">
                <p className="text-sm">
                  <b>Sign up for newsletter</b>
                  <br /> is a small dose of wisdom, encouragement, and practical
                  advice designed to brighten your everyday routine
                </p>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                <button className="bg-brand text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 px-6 py-2 font-bold shadow-md">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
    </div>

   
  );
}
