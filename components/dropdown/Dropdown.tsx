import React, { useState, useRef, useEffect } from "react";
import DownArrowIcon from "../icons/DownArrowIcon";
import CloseIcon from "../icons/CloseIcon";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Dropdown({ title, children, description, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (disabled) return;
    
    setIsOpen(!isOpen);
  } 
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown relative" ref={ref}>
      <button className="flex items-center" onClick={toggleDropdown} disabled={disabled}>
        <span className="text-gray-500">{title}</span>
        <DownArrowIcon />
      </button>
      {isOpen && (
        <div className="dropdown-content md:w-[300px] bg-dark-2 absolute shadow-lg mt-2 rounded border border-dark z-10 md:right-0">
          <div className="text-xs text-white border-b p-3 flex items-center justify-between">
            <span className="truncate">{description}</span>
            <button type="button" onClick={closeDropdown}>
              <CloseIcon />
            </button>
          </div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}
