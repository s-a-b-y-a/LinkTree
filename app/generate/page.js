"use client";
import React, { useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";

const GenerateForm = () => {
  const router = useRouter();
  const searchparams = useSearchParams(); // Needs Suspense
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchparams.get("handle") || "");
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");

  const handlechange = (index, link, linktext) => {
    setlinks((initiallinks) =>
      initiallinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  const addlink = () => {
    setlinks(links.concat([{ link: "", linktext: "" }]));
  };

  const submitlinks = async () => {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links, handle, pic, desc }),
    });

    const result = await res.json();

    if (result.success) {
      toast.success(result.message, {
        onClose: () => router.push(`/${handle}`),
      });
      setlinks([{ link: "", linktext: "" }]);
      setpic("");
      setdesc("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="bg-[#e9c0e9] text-black min-h-[100vh] flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-6 md:py-0 overflow-y-auto">
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <h1 className="font-bold text-3xl sm:text-4xl text-center">
            Create Your Linktree
          </h1>

          {/* Handle Input */}
          <div className="items my-4">
            <h2 className="font-semibold text-xl sm:text-2xl">
              Step 1: Claim Your Handle
            </h2>
            <input
              value={handle}
              onChange={(e) => sethandle(e.target.value)}
              className="px-4 py-3 focus:outline-pink-500 rounded-full w-full border border-gray-300"
              type="text"
              placeholder="Enter Handle"
            />
          </div>

          {/* Links Input */}
          <div className="items my-4">
            <h2 className="font-semibold text-xl sm:text-2xl">Step 2: Add Links</h2>
            {links.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 my-2">
                <input
                  value={item.linktext || ""}
                  onChange={(e) =>
                    handlechange(index, item.link, e.target.value)
                  }
                  className="px-4 py-3 focus:outline-pink-500 rounded-full flex-1 border border-gray-300"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link || ""}
                  onChange={(e) =>
                    handlechange(index, e.target.value, item.linktext)
                  }
                  className="px-4 py-3 focus:outline-pink-500 rounded-full flex-1 border border-gray-300"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
            <button
              onClick={addlink}
              className="mt-4 bg-purple-900 text-white px-6 py-3 rounded-full font-bold w-full sm:w-auto"
            >
              Add Link
            </button>
          </div>

          {/* Picture and Description */}
          <div className="items my-4">
            <h2 className="font-semibold text-xl sm:text-2xl">
              Step 3: Add a Profile Picture and Description
            </h2>
            <input
              value={pic || ""}
              onChange={(e) => setpic(e.target.value)}
              className="px-4 py-3 focus:outline-pink-500 rounded-full w-full border border-gray-300 mb-2"
              type="text"
              placeholder="Enter Profile pic URL"
            />
            <input
              value={desc || ""}
              onChange={(e) => setdesc(e.target.value)}
              className="px-4 py-3 focus:outline-pink-500 rounded-full w-full border border-gray-300"
              type="text"
              placeholder="Enter Description"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={pic === "" || handle === "" || links[0].link === ""}
            onClick={submitlinks}
            className="disabled:bg-purple-500 bg-purple-900 text-white px-6 py-3 rounded-full font-bold w-full sm:w-auto"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 hidden md:block">
        <img
          className="h-full w-full object-cover"
          src="/cover.png"
          alt="Generate your links"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

const Generate = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateForm />
    </Suspense>
  );
};

export default Generate;
