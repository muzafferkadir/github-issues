import { getIssuesDataParams, modeOptions, getAuthorsParams, totalCountsResponse } from "@/types";

export const getIssuesData = async (
  params: getIssuesDataParams = { per_page: "5" },
  mode: modeOptions = "open",
  author: string | null = null,
  label: string | null = null
) => {
  const query = new URLSearchParams(params).toString();
  const authorQuery = author ? `+author:${author}` : "";
  const labelQuery = label ? `+label:"${label.replace(" ", "+")}"` : "";

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/issues?q=repo:facebook/react+type:issue+state:${mode}${authorQuery}${labelQuery}&${query}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getAuthors = async (
  params: getAuthorsParams = { per_page: "10" }
) => {
  const query = new URLSearchParams(params).toString();
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/repos/facebook/react/contributors?${query}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getTotalCounts = async () => {
  const openIssuesUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/issues?q=repo:facebook/react+type:issue+state:open&per_page=1`;
  const closedIssuesUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/issues?q=repo:facebook/react+type:issue+state:closed&per_page=1`;

  const [openIssuesResponse, closedIssuesResponse] = await Promise.all([
    fetch(openIssuesUrl),
    fetch(closedIssuesUrl),
  ]);

  if (!openIssuesResponse.ok || !closedIssuesResponse.ok) {
    throw new Error(`HTTP error! Status: ${openIssuesResponse.status}`);
  }

  const openIssues = await openIssuesResponse.json();
  const closedIssues = await closedIssuesResponse.json();

  return {
    open: openIssues?.total_count || 0,
    closed: closedIssues?.total_count || 0,
  } as totalCountsResponse;
};

export const getLabels = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/repos/facebook/react/labels?per_page=100`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
