"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWithTitle from "../cardWithTitle/CardWithTitle";
import IssuesTableHeader from "./IssuesTableHeader";
import OpenIssuesIcon from "../icons/OpenIssuesIcon";
import CheckIcon from "../icons/CheckIcon";
import Bagde from "../badge/Bagde";
import CommentIcon from "../icons/CommentIcon";
import { Issue, Label, SortNames, getIssuesDataParams, modeOptions } from "@/types";
import { getIssuesData } from "@/services/api";

type Props = {
  totalCounts: {
    open: number;
    closed: number;
  };
  initialIssues: Issue[];
  labels: Label[];
};

export default function IssuesTable({
  totalCounts,
  initialIssues,
  labels,
}: Props) {
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [filters, setFilters] = useState<getIssuesDataParams>({
    per_page: "5",
  });
  const [mode, setMode] = useState<modeOptions>("open");
  const [author, setAuthor] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortNames>("Newest");

  const getHumanReadableTime = (time: Date): string => {
    const date = new Date(time);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const getIssuesDataWithFilters = useCallback(async () => {
    const data = await getIssuesData(filters, mode, author, label);
    setIssues(data.items);
  }, [filters, mode, author, label]);

  const setFilterOptions = (
    newFilters: getIssuesDataParams = {
      per_page: "5",
    },
    name: SortNames
  ) => {
    setFilters(newFilters);
    setSortBy(name);
  };

  const changeMode = async (newMode: modeOptions) => {
    setMode(newMode);
  };

  useEffect(() => {
    if (!isInitialMount) {
      getIssuesDataWithFilters();
    } else {
      setIsInitialMount(false);
    }
  }, [mode, filters, author, label]);

  return (
    <CardWithTitle
      title={
        <IssuesTableHeader
          totalCounts={totalCounts}
          setFilterOptions={setFilterOptions}
          changeMode={changeMode}
          setAuthor={setAuthor}
          selectedAuthorName={author}
          labels={labels}
          setLabel={setLabel}
          selectedLabelName={label}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      }
    >
      {issues.map((issue) => (
        <div
          className="flex justify-between p-3 border-b border-dark-3 hover:bg-dark-2"
          key={issue.id}
        >
          <div className="flex">
            <div className="mt-1">
              {issue.state === "open" ? (
                <OpenIssuesIcon color="green" />
              ) : (
                <CheckIcon />
              )}
            </div>
            <div className="ml-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  className="font-semibold text-white hover:text-blue cursor-pointer"
                  href={issue.html_url}
                >
                  {issue.title}
                </a>
                <div className="text-gray-500 text-xs flex items-center gap-2">
                  {issue.labels.map((badge) => (
                    <Bagde
                      key={badge.id}
                      text={badge.name}
                      color={badge.color}
                    />
                  ))}
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {issue.id} opened on {getHumanReadableTime(issue.created_at)} by{" "}
                {issue.user.login}
              </div>
            </div>
          </div>
          {issue.comments !== 0 && (
            <div className="text-gray-500 flex items-start gap-1">
              <span className="mt-1">
                <CommentIcon />
              </span>
              <span>{issue.comments}</span>
            </div>
          )}
        </div>
      ))}
    </CardWithTitle>
  );
}
