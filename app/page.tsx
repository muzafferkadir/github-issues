import IssuesTable from "@/components/issuesTable/IssuesTable";
import { getIssuesData, getTotalCounts, getLabels } from "@/services/api";
import { Issue, Label, totalCountsResponse } from "@/types";

export default async function Home() {
  const counts = (await getTotalCounts()) as totalCountsResponse;
  const { items: issues } = (await getIssuesData()) as { items: Issue[] };
  const labels = (await getLabels()) as Label[];

  return (
    <main className="flex flex-wrap -mx-2 gap-y-4 lg:gap-y-0">
      <IssuesTable
        totalCounts={counts}
        initialIssues={issues}
        labels={labels}
      />
    </main>
  );
}
