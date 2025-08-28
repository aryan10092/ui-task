import React from "react";

export default function PhoneFrame({ imageUrl }) {
  return (
    <div
      className=" w-[220px] md:w-[260px] lg:w-[300px] max-w-[90vw]"
      aria-label="Phone preview"
    >
      <div className="relative w-full aspect-[9/19.5] rounded-[36px] bg-black shadow-[inset_0_0_0_10px_#111,0_18px_40px_rgba(0,0,0,0.25)] p-2.5 overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[45%] h-[18px] rounded-b-xl bg-neutral-900 z-10" />
        <div
          className="absolute inset-3 rounded-[28px] bg-cover bg-center transition-all"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      </div>
    </div>
  );
}
