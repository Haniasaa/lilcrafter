"use client";

import { useRouter } from "next/navigation";

export default function CustomizedPage() {
  const router = useRouter();

  const handleBuy = (name: string) => {
    const message = `Hi, I want to order: ${name}`;
    const url = `https://wa.me/923345642332?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="bg-[#FAF7F2]">

      {/* NAVBAR (same as home) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5
      backdrop-blur-xl bg-black/30 border-b border-white/10">

        <h1 className="text-white text-2xl font-bold">
          LilCrafter
        </h1>

        <div className="flex gap-6 text-white text-sm">

          <button onClick={() => router.push("/")}>
            Home
          </button>

          <button onClick={() => router.push("/customized")}>
            Cars
          </button>

        </div>

      </nav>

      {/* HERO VIDEO (smaller height than homepage) */}
      <section className="relative h-[60vh] w-full overflow-hidden">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/av.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

          <h1 className="text-white text-4xl md:text-6xl font-extrabold">
            CARS
          </h1>

        </div>

      </section>

      {/* TEXT */}
      <section className="text-center py-10 px-6">

        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
        <p className="text-[#6B6B6B] text-lg mt-4 max-w-2xl mx-auto">
  Fun car coloring activities for kids to enjoy creative play, improve focus, 
  and explore colors through hands-on learning.
</p>
        </p>

      </section>

      {/* PRODUCTS */}
      <section className="px-6 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* CARD 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">

            <img src="/a5.jpg" className="w-full h-60 object-cover" />

            <div className="p-5">

              <h3 className="font-bold text-xl">Customized Board</h3>
              <p className="text-[#C4A484] font-bold mt-1">Rs. 1200</p>

              <button
                onClick={() => handleBuy("Customized Board")}
                className="mt-4 w-full bg-[#C4A484] text-white py-2 rounded-full"
              >
                Buy Now
              </button>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">

            <img src="/a6.jpg" className="w-full h-60 object-cover" />

            <div className="p-5">

              <h3 className="font-bold text-xl">Name Craft</h3>
              <p className="text-[#C4A484] font-bold mt-1">Rs. 999</p>

              <button
                onClick={() => handleBuy("Name Craft")}
                className="mt-4 w-full bg-[#C4A484] text-white py-2 rounded-full"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER (simple same style as home) */}
      <footer className="bg-[#C4A484] text-white text-center py-8 mt-10">
        © 2026 LilCrafter. All rights reserved.
      </footer>

    </main>
  );
}