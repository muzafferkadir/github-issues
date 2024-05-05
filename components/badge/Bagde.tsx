import React from "react";
import classNames from "classnames";

type Props = {
  text: string;
  className?: string;
  color?: string;
};

export default function Bagde({ text, className, color }: Props) {
  const classes = classNames(
    "bg-dark-1 text-white text-xs font-medium rounded-[12px] px-2 py-0.5",
    className
  );

  function getColor(hexColor:string) {
    const color = `#${hexColor}`;
    const backgroundColor = `#${hexColor}1A`;
    const borderColor = `#${hexColor}4D`;
    return {
      color,
      backgroundColor,
      borderColor,
      borderWidth: "1px",
      borderStyle: "solid",
    };
  }
  return (
    <span className={classes} style={getColor(color || "#000000")}>
      {text}
    </span>
  );
}
