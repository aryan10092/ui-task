import React from "react";

export default function Spacer({ label = "" }) {
  return (
    <div className=" h-[80vh] grid place-items-center md:bg-blue-50 text-blue-400 md:border-b border-blue-100">
      <div className="hidden md:block text-sm tracking-wider uppercase">
        {label}</div>
    </div>
  );
}
