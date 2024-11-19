"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, settext] = useState("");
  const router = useRouter();

  const createtree = () => {
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main className="overflow-hidden">
      <section className="bg-[#254F1A] min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
        {/* Left Section */}
        <div className="px-6 md:ml-[10vw] flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left">
          <p className="text-yellow-300 font-bold text-3xl sm:text-4xl md:text-5xl">
            Everything you are. In one, simple link in bio.
          </p>
          <div className="input flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="px-4 py-2 focus:outline-green-500 rounded-md text-black font-bold w-full md:w-auto"
              type="text"
              placeholder="Enter your handle"
            />
            <button
              disabled={text == ""}
              onClick={createtree}
              className="bg-pink-200 disabled:bg-pink-50 text-black font-semibold rounded-2xl px-4 py-2"
            >
              Claim Your Linktree
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-yellow-300 font-bold flex items-center justify-center mt-6 md:mt-0">
          <Image
            src="/home.png"
            alt="home page image"
            width={400}
            height={400}
            className="w-2/3 sm:w-2/3 md:w-full"
          />
        </div>
      </section>
    </main>
  );
}
