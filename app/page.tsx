"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const reviews = [
    { name: "Ayesha M.", text: "My child stopped using mobile after these toys!" },
    { name: "Sara K.", text: "Very creative and safe toys." },
    { name: "Hina R.", text: "Premium quality and learning focused." }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-scroll");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="relative w-full overflow-hidden bg-pink-50">

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#FAF7F2] scroll-mt-24">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        >
          <source src="/av.mp4" type="video/mp4" />
        </video>


  {/* Overlay (slightly darker than before) */}
  <div className="absolute inset-0 bg-black/40"></div>

 {/* NAVBAR */}
<nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5
backdrop-blur-xl bg-black/30 border-b border-white/10">

  {/* LOGO */}
  <h1 className="text-white text-3xl font-extrabold tracking-wide">
    LilCrafter
  </h1>

  {/* LINKS */}
  <div className="hidden md:flex items-center gap-8 text-white font-medium">

    {/* HOME */}
  <a href="#home" className="cursor-pointer hover:text-[#E6D3B3] transition">
      Home
    </a>
 {/* DROPDOWN WRAPPER */}
  <div className="relative group">

  <button className="hover:text-[#E6D3B3] transition duration-300 cursor-pointer">
    Categories
  </button>

  {/* DROPDOWN Menu */}
  <div className="absolute left-0 top-full pt-3 w-56 z-50
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    translate-y-2 group-hover:translate-y-0
    transition-all duration-200">

    {/* FULL WHITE BOX */}
    <div className="bg-[#FFFDF8] backdrop-blur-md rounded-2xl shadow-2xl border border-[#E8DED2] overflow-hidden">

      <a href="/customized" className="block px-5 py-4 text-[#2B2B2B] hover:bg-[#F5F1EC] transition">
        Customized
      </a>

      <a href="/shapes" className="block px-5 py-4 text-[#2B2B2B] hover:bg-[#F5F1EC] transition">
        Shapes
      </a>

      <a href="/cars" className="block px-5 py-4 text-[#2B2B2B] hover:bg-[#F5F1EC] transition">
        Cars
      </a>

      <a href="/keychains" className="block px-5 py-4 text-[#2B2B2B] hover:bg-[#F5F1EC] transition">
        Keychains
      </a>

    </div>
  </div>

</div>
    {/* PRODUCTS */}
    <a href="#products" className="hover:text-[#E6D3B3] hover:scale-105 transition duration-300 cursor-pointer">
      Products
    </a>

    {/* ABOUT */}
    <a href="#about" className="hover:text-[#E6D3B3] hover:scale-105 transition duration-300 cursor-pointer">
      About
    </a>

    {/* CONTACT */}
    <a href="#contact" className="hover:text-[#E6D3B3] hover:scale-105 transition duration-300 cursor-pointer">
      Contact
    </a>

    {/* ORDER BUTTON */}
    <a
      href="https://wa.me/923345642332"
      target="_blank"
      className="bg-[#C4A484] hover:bg-[#B89674] transition px-6 py-3 rounded-full font-bold text-white shadow-xl"
    >
      Order Now
    </a>

  </div>

</nav>

  {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-24 md:pt-32">

    {/* FULL WHITE HEADING (ALL CAPS) */}
    <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight uppercase animate-[fadeIn_1.2s_ease-out]">
  
      Screen Free Learning <br />
      Activity

    </h1>

    {/* GREY PARAGRAPH */}
    <p className="text-gray-300 mt-8 text-lg md:text-2xl max-w-2xl">
      Fun, educational toys designed to build imagination, creativity and joyful childhood experiences.
    </p>

    {/* DARK BEIGE BUTTON */}
    <a
  href="#categories"
  className="mt-10 inline-block px-10 py-4 rounded-full text-white font-semibold text-lg
  bg-[#C4A484] hover:bg-[#B89674]
  shadow-lg hover:scale-105 transition-all duration-300"
>
  Explore Collection
</a>

  </div>

</section>



{/* CATEGORIES SECTION */}
<section id="categories" className="py-24 bg-[#FAF7F2] text-center">

  {/* WHITE HEADING */}
  <h2 className="fade-scroll text-4xl md:text-5xl font-extrabold mb-14 text-[#B89674]">
  Shop by Categories
</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">

    <a href="/customized">
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8DED2]
    hover:-translate-y-1 hover:shadow-lg transition cursor-pointer">

    <h3 className="text-xl font-bold text-[#C4A484]">
      Customized
    </h3>

    <p className="text-sm text-[#6B6B6B] mt-2">
      A to Z alphabets, names
    </p>

  </div>
</a>

    <a href="/shapes">
  <div className="bg-[#F3EDE3] rounded-2xl p-8 shadow-sm border border-[#E8DED2]
    hover:-translate-y-1 hover:shadow-lg transition cursor-pointer">

    <h3 className="text-xl font-bold text-[#C4A484]">
      Shapes
    </h3>

    <p className="text-sm text-[#6B6B6B] mt-2">
      Fun shape learning activities
    </p>

  </div>
</a>
<a href="/cars">
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8DED2]
    hover:-translate-y-1 hover:shadow-lg transition cursor-pointer">

    <h3 className="text-xl font-bold text-[#C4A484]">
      Cars
    </h3>

    <p className="text-sm text-[#6B6B6B] mt-2">
      Vehicle themed toys
    </p>

  </div>
</a>

    <a href="/keychains">
  <div className="bg-[#F3EDE3] rounded-2xl p-8 shadow-sm border border-[#E8DED2]
    hover:-translate-y-1 hover:shadow-lg transition cursor-pointer">

    <h3 className="text-xl font-bold text-[#C4A484]">
      Keychains
    </h3>

    <p className="text-sm text-[#6B6B6B] mt-2">
      Creative DIY keychains
    </p>

  </div>
</a>


  </div>

</section>
{/* PRODUCTS GRID */}
<section id="products" className="py-16 md:py-20 bg-[#FAF7F2] text-center px-6">

  <h2 className="fade-scroll text-4xl md:text-5xl font-extrabold text-[#2B2B2B] mb-14">
  Our Products
</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">

    {["aq.jpg","a2.jpg","a3.jpg","a4.jpg","a5.jpg","a6.jpg","a7.jpg","a8.jpg"].map((img, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl overflow-hidden border border-[#E8DED2]
        shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
      >

        {/* IMAGE */}
        <img
          src={`/${img}`}
          className="w-full h-44 object-cover"
        />

        {/* CONTENT */}
        <div className="p-4 text-left">

          <h3 className="font-bold text-[#2B2B2B]">
            Kids Learning Toy
          </h3>

          <p className="text-[#6B6B6B] text-sm mt-1">
            Fun educational activity set
          </p>

          {/* PRICE */}
          <div className="mt-3 flex items-center justify-between">

            <span className="text-[#C4A484] font-bold text-lg">
              Rs. 999
            </span>

            <button className="bg-[#C4A484] hover:bg-[#B89674]
              text-white text-sm px-4 py-2 rounded-full transition">
              Buy
            </button>

          </div>

        </div>

      </div>
    ))}

  </div>

</section>
{/* ABOUT SECTION */}
<section id="about" className="py-16 md:py-20 bg-[#FAF7F2] text-center px-6">

  <h2 className="fade-scroll text-4xl md:text-5xl font-extrabold text-[#2B2B2B] mb-6">
  About LilCrafter
</h2>

  <p className="max-w-3xl mx-auto text-[#6B6B6B] text-lg leading-relaxed">
    LilCrafter is a creative kids brand focused on screen-free learning,
    fun educational toys, and imagination-building activities.
    We believe childhood should be joyful, creative, and full of discovery.
  </p>

  {/* FEATURE CARDS */}
  <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Creativity */}
    <div className="bg-[#C4A484] rounded-2xl p-6 shadow-md hover:shadow-xl transition">

      <h3 className="font-bold text-white text-xl">
        🎨 Creativity
      </h3>

      <p className="text-[#F5F1EC] mt-2 text-sm">
        Boost imagination through hands-on play and creative thinking
      </p>

    </div>

    {/* Learning */}
    <div className="bg-[#B89674] rounded-2xl p-6 shadow-md hover:shadow-xl transition">

      <h3 className="font-bold text-white text-xl">
        🧠 Learning
      </h3>

      <p className="text-[#F5F1EC] mt-2 text-sm">
        Educational toys designed for smart early development
      </p>

    </div>

    {/* Growth */}
    <div className="bg-[#C4A484] rounded-2xl p-6 shadow-md hover:shadow-xl transition">

      <h3 className="font-bold text-white text-xl">
        🚀 Growth
      </h3>

      <p className="text-[#F5F1EC] mt-2 text-sm">
        Build confidence, problem solving and real-life skills
      </p>

    </div>

  </div>

</section>
{/* TESTIMONIALS SECTION */}
<section className="py-16 md:py-20 bg-[#F3EDE3] text-center px-6">

  <h2 className="text-4xl md:text-5xl font-extrabold text-[#2B2B2B] mb-10">
    What Parents Say
  </h2>

  <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-[#E8DED2] overflow-hidden">

    <div className="animate-slide">

      <p className="text-[#6B6B6B] text-lg">
        “{reviews[index].text}”
      </p>

      <h4 className="mt-6 font-bold text-[#2B2B2B]">
        — {reviews[index].name}
      </h4>

    </div>

  </div>

</section>
  

  {/* FOOTER */}
<footer
  id="contact"
 className="bg-[#C4A484]/70 backdrop-blur-md text-white py-16 px-6 mt-20 border-t border-white/20"
>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* Brand */}
    <div>
      <h2 className="text-3xl font-extrabold tracking-wide">
        LilCrafter
      </h2>

      <p className="text-[#F5F1EC] mt-4 text-sm leading-7 max-w-sm">
        Screen-free learning toys designed for creative childhood growth
        with fun, imagination, and meaningful play.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-semibold text-xl mb-5">
        Quick Links
      </h3>

      <ul className="space-y-3 text-[#F5F1EC] text-sm">
        <li className="hover:translate-x-1 transition duration-300 cursor-pointer">
          Home
        </li>

        <li className="hover:translate-x-1 transition duration-300 cursor-pointer">
          Categories
        </li>

        <li className="hover:translate-x-1 transition duration-300 cursor-pointer">
          Products
        </li>

        <li className="hover:translate-x-1 transition duration-300 cursor-pointer">
          Contact
        </li>
      </ul>
    </div>

    {/* Contact + Social */}
    <div>
      <h3 className="font-semibold text-xl mb-5">
        Connect With Us
      </h3>

      <p className="text-[#F5F1EC] text-sm mb-5">
        Follow us on social platforms for latest toys & updates.
      </p>

      <div className="flex items-center gap-5">

        {/* WhatsApp */}
        <a
          href="https://wa.me/923345642332"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/15 p-3 rounded-full hover:bg-white/25 hover:scale-110 transition duration-300"
        >
          <img
            src="/c.png"
            alt="WhatsApp"
            className="w-7 h-7"
          />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/lilcrafter52?igsh=aGkxNzV0N2gzZzgz"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/15 p-3 rounded-full hover:bg-white/25 hover:scale-110 transition duration-300"
        >
          <img
            src="/a.png"
            alt="Instagram"
            className="w-7 h-7"
          />
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/61573629095958"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/15 p-3 rounded-full hover:bg-white/25 hover:scale-110 transition duration-300"
        >
          <img
            src="/b.png"
            alt="Facebook"
            className="w-7 h-7"
          />
        </a>

        {/* Daraz */}
        <a
          href="https://www.daraz.pk/shop/jfspqxjq"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/15 p-3 rounded-full hover:bg-white/25 hover:scale-110 transition duration-300"
        >
          <img
            src="/d.png"
            alt="Daraz"
            className="w-7 h-7"
          />
        </a>

      </div>
    </div>

  </div>

  {/* Bottom */}
  <div className="border-t border-white/20 mt-12 pt-6 text-center">
    <p className="text-[#F5F1EC] text-xs tracking-wide">
      © 2026 LilCrafter. All rights reserved.
    </p>
  </div>
</footer>

  </main>
);
}