import React from "react";
import style from "./Dropdown.module.css";
import classNames from "classnames";
import { SortOptions, OrderOptions, SortNames } from "@/types";

type Props = {
  onSelect: (sort: SortOptions, order: OrderOptions, name: SortNames) => void;
  selected: string | null;
};

export default function SortDropdown({ onSelect, selected }: Props) {
  const cxSortList = classNames(
    "max-h-60 overflow-y-auto flex flex-col border-t border-dark divide-y",
    style["custom-scrollbar"]
  );

  const options: { name: SortNames; sort: SortOptions; order: OrderOptions }[] =
    [
      { name: "Newest", sort: "created", order: "desc" },
      { name: "Oldest", sort: "created", order: "asc" },
      { name: "Most commented", sort: "comments", order: "desc" },
      { name: "Least commented", sort: "comments", order: "asc" },
      { name: "Recently updated", sort: "updated", order: "desc" },
      { name: "Least recently updated", sort: "updated", order: "asc" },
    ];

  return (
    <div>
      <div className={cxSortList}>
        {options.map((option) => (
          <div
            key={option.name}
            className={classNames(
              "text-white flex items-center px-8 py-2 text-xs gap-2 hover:bg-dark-3 cursor-pointer",
              {
                "bg-dark-3": selected === option.name,
              }
            )}
            onClick={() => onSelect(option.sort, option.order, option.name)}
          >
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
