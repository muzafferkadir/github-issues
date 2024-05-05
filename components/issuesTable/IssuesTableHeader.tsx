import React, { Dispatch, useEffect, useState } from "react";
import OpenIssuesIcon from "../icons/OpenIssuesIcon";
import CheckIcon from "../icons/CheckIcon";
import classNames from "classnames";
import Dropdown from "../dropdown/Dropdown";
import AuthorsDropdown from "../dropdown/AuthorsDropdown";
import {
  Author,
  Label,
  OrderOptions,
  SortNames,
  SortOptions,
  getIssuesDataParams,
  totalCountsResponse,
} from "@/types";
import LabelsDropdown from "../dropdown/LabelsDropdown";
import SortDropdown from "../dropdown/SortDropdown";

type Props = {
  setFilterOptions: (newFilters: getIssuesDataParams, name: SortNames) => void;
  changeMode: (mode: "open" | "closed") => void;
  totalCounts: totalCountsResponse;
  setAuthor: Dispatch<React.SetStateAction<string | null>>;
  selectedAuthorName: string | null;
  labels: Label[];
  setLabel: Dispatch<React.SetStateAction<string | null>>;
  selectedLabelName: string | null;
  sortBy: string;
  setSortBy: Dispatch<React.SetStateAction<SortNames>>;
};

export default function IssuesTableHeader({
  setFilterOptions,
  changeMode,
  totalCounts,
  setAuthor,
  selectedAuthorName,
  labels,
  selectedLabelName,
  setLabel,
  sortBy,
  setSortBy,
}: Props) {
  const [mode, setMode] = useState<"open" | "closed">("open");

  const getModeClass = (option: "open" | "closed") => {
    return classNames("flex items-center cursor-pointer hover:text-white", {
      "text-gray-500": mode !== option,
      "text-white": mode === option,
      "font-light": mode !== option,
    });
  };

  const handleModeChange = (option: "open" | "closed") => {
    changeMode(option);
    setMode(option);
  };

  const handleAuthorSelect = (author: Author | null) => {
    if (author === null || author.login === "All" || !author.login) {
      setAuthor(null);
      return;
    }

    setAuthor(author.login);
  };

  const handleFilterSelect = (
    sort: SortOptions,
    order: OrderOptions,
    name: SortNames
  ) => {
    setFilterOptions({ sort, order, per_page: "5" }, name);
  };

  const filters = [
    {
      name: "Author" + (selectedAuthorName ? `: ${selectedAuthorName}` : ""),
      active: true,
      component: (
        <AuthorsDropdown
          onSelect={handleAuthorSelect}
          selected={selectedAuthorName}
        />
      ),
    },
    {
      name: "Label" + (selectedLabelName ? `: ${selectedLabelName}` : ""),
      active: true,
      component: (
        <LabelsDropdown
          onSelect={setLabel}
          selected={selectedLabelName}
          labels={labels}
        />
      ),
    },
    {
      name: "Projects",
      active: false,
    },
    {
      name: "Milestones",
      active: false,
    },
    {
      name: "Assignee",
      active: false,
    },
    {
      name: "Sort" + (sortBy !== "Newest" ? `: ${sortBy}` : ""),
      active: true,
      component: (
        <SortDropdown onSelect={handleFilterSelect} selected={sortBy} />
      ),
    },
  ];
  return (
    <div className="flex justify-between flex-grow md:flex-row flex-col md:item-center gap-4">
      <div className="flex items-center">
        <span
          className={getModeClass("open")}
          onClick={() => handleModeChange("open")}
        >
          <OpenIssuesIcon color={mode === "open" ? "white" : "gray"} />
          <span className="ml-1.5">{totalCounts.open} Open</span>
        </span>
        <span className={getModeClass("closed") + " ml-4"}>
          <CheckIcon color={mode === "closed" ? "white" : "gray"} />
          <span className="ml-1.5" onClick={() => handleModeChange("closed")}>
            {totalCounts.closed} Closed
          </span>
        </span>
      </div>
      <div className="dropdowns flex items-center md:gap-4 gap-2 flex-wrap md:flex-nowrap">
        {filters.map((filter) => (
          <Dropdown
            key={filter.name}
            title={filter.name}
            description={"Filter by " + filter.name}
            disabled={!filter.active}
          >
            {filter.component}
          </Dropdown>
        ))}
      </div>
    </div>
  );
}
