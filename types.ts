export type Issue= {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: null;
  }[];
  state: "open" | "closed";
  locked: boolean;
  assignee: null;
  assignees: [];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: "MEMBER";
  active_lock_reason: null;
  draft: boolean;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: null;
  };
  body: string;
  reactions: {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
};

export type Author= {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};

export type Label = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: null;
};

export type SortOptions = | "comments"
| "reactions"
| "reactions-+1"
| "reactions--1"
| "reactions-smile"
| "reactions-thinking_face"
| "reactions-heart"
| "reactions-tada"
| "interactions"
| "created"
| "updated";

export type OrderOptions = "desc" | "asc";

export type SortNames = "Newest" | "Oldest" | "Most commented" | "Least commented" | "Recently updated" | "Least recently updated";

export type getIssuesDataParams = {
  per_page: `${number}`;
  sort?: SortOptions;
  order?: OrderOptions;
};

export type getAuthorsParams = {
  per_page: string;
};

export type modeOptions = "open" | "closed";

export type totalCountsResponse = {
  open: number;
  closed: number;
};