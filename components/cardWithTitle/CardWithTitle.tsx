import React from "react";
import CodeIcon from "../icons/CodeIcon";

type Props = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultTab?: string;
  footer?: React.ReactNode;
  image?: string;
};

export default function CardWithTitle({
  title,
  children,
  icon,
  defaultTab,
  footer,
}: Props) {
  return (
    <div className="border border-dark rounded w-full">
      <div className="bg-dark-2 border-b border-dark">
        <h3 className="p-4 text-sm font-semibold flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
        {defaultTab && (
          <ul className="flex items-center text-xs mx-5 -mb-px">
            <li className="mr-2 border-1 p-2 bg-primary rounded-t border-dark border-b-0">
              <a href="#" className="text-white flex gap-2">
                <CodeIcon />
                {defaultTab}
              </a>
            </li>
          </ul>
        )}
      </div>
      <div className="shadow-[inset_0px_-10px_10px_0px_rgba(0,0,0,0.25)]">
        {children}
      </div>
      {footer && <div className="px-4 py-2 border-t border-dark">{footer}</div>}
    </div>
  );
}
