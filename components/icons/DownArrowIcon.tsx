import React from "react";

type Props = {};

export default function DownArrow({}: Props) {
  return (
    <svg
      className="w-3 h-3 ml-1 text-gray-500"
      fill="currentColor"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6 8l4-4H2l4 4z"></path>
    </svg>
  );
}
