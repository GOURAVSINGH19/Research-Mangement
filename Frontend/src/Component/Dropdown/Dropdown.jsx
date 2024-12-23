import React, { useState } from "react";

function Dropdown({ title, options , func }) {

  return (
    <div className="relative inline-block w-40 md:w-64">
      <select
        name="format"
        id="format"
        onChange={func}
        className="block appearance-none w-full  border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline bg-transparent"
      >
        <option value="" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-100">
        <svg
          className="fill-current h-4 w-4 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548L10 12.032l4.484-4.484A.75.75 0 0013.454 6L10 9.454 6.546 6a.75.75 0 00-1.03 1.03z" />
        </svg>
      </div>
    </div>
  );
}

export default Dropdown;
