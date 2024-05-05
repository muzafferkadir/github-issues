import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import { Label } from "@/types";
import style from "./Dropdown.module.css";
import classNames from "classnames";

type Props = {
  onSelect: (label: string | null) => void;
  selected: string | null;
  labels: Label[];
};

export default function LabelsDropdown({ onSelect, selected, labels }: Props) {
  const [search, setSearch] = useState<string>("");
  const [filteredLabels, setFilteredLabels] = useState<Label[]>(labels);

  const cxLabelList = classNames(
    "max-h-60 overflow-y-auto flex flex-col border-t border-dark divide-y",
    style["custom-scrollbar"]
  );

  const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filtered = labels.filter((label) =>
      label.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLabels(filtered);
  }, [search, labels]);

  return (
    <div>
      <div className="p-2">
        <Input placeholder={"Filter Labels"} onChange={handleLabelsChange} />
      </div>
      <div className={cxLabelList}>
        {filteredLabels.map((label) => (
          <div
            key={label.id}
            className={classNames(
              "text-white flex items-center px-8 py-2 text-xs gap-2 hover:bg-dark-3 cursor-pointer",
              {
                "bg-dark-3": selected === label.name,
              }
            )}
            onClick={() =>
              onSelect(selected === label.name ? null : label.name)
            }
          >
            {label.color ? (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#" + label.color }}
              ></div>
            ) : (
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            )}
            <span>{label.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
