import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Simple status pill without extra dependencies
const StatusPill = ({ status }) => {
  const tone =
    status === "Published"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "Draft"
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-slate-50 text-slate-700 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${tone}`}
    >
      {status}
    </span>
  );
};

const DashboardDestinations = () => {
  // Replace with backend data + loading later
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("All");
  const [loading] = React.useState(false);

  const destinations = []; // placeholder

  const filtered = React.useMemo(() => {
    return destinations
      .filter((d) =>
        status === "All" ? true : (d.status || "").toLowerCase() === status.toLowerCase()
      )
      .filter((d) =>
        query.trim()
          ? (d.name || "").toLowerCase().includes(query.trim().toLowerCase()) ||
            (d.description || "").toLowerCase().includes(query.trim().toLowerCase())
          : true
      );
  }, [destinations, query, status]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Destinations</h1>
          <p className="text-sm text-muted-foreground">
            Create, organize, and publish destinations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Import CSV</Button>
          <Button>Create destination</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search destinations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[260px]"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 rounded-md border bg-background px-2 text-sm"
            >
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filtered.length} results
          </div>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="h-9 animate-pulse rounded bg-muted" />
            <div className="h-9 animate-pulse rounded bg-muted" />
            <div className="h-9 animate-pulse rounded bg-muted" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <div className="text-base font-medium">No destinations found</div>
            <p className="max-w-md text-sm text-muted-foreground">
              Try adjusting your search or filters, or create a new destination.
            </p>
            <Button className="mt-2">Create destination</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[28%]">Name</TableHead>
                  <TableHead className="w-[44%]">Description</TableHead>
                  <TableHead className="w-[14%]">Status</TableHead>
                  <TableHead className="w-[14%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((destination) => (
                  <TableRow key={destination.id || destination.name}>
                    <TableCell className="font-medium truncate">
                      {destination.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="line-clamp-2">
                        {destination.description}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusPill status={destination.status || "Draft"} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Showing {Math.min(filtered.length, 10)} of {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardDestinations;
