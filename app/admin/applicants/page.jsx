import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const applicants = [
  { name: "Rahul Sharma", email: "rahul@gmail.com", status: "Applied" },
  { name: "Ananya Singh", email: "ananya@gmail.com", status: "Shortlisted" },
];

export default function ApplicantsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applicants</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.map((app, i) => (
            <TableRow key={i}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className="mt-4" variant="outline">
        Download CSV
      </Button>
    </div>
  );
}
