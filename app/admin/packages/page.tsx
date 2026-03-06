import { fetchPackagesFormAdmin } from "@/actions/package.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import Link from "next/link";

const PackagesPage = async () => {
  const packages = await fetchPackagesFormAdmin({ page: 1 });

  return (
    <div className="">
      <div className="flex-header">
        <h1>Packages</h1>
        <Button variant="success" asChild>
          <Link href="/admin/packages/add">Create New Package</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Available Dates</TableHead>
            <TableHead>
              Actions
              {/* add new dates, unpublish, edit */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell>{pkg.packageTitle}</TableCell>
              <TableCell className="flex flex-col gap-2">
                <span>Adult: ₹{pkg.amountPerAdult}</span>
                <span>Child: ₹{pkg.amountPerChild}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {pkg.availableDates?.map((date, index) => (
                    <Badge key={index}>
                      {new Date(date).toLocaleDateString()}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PackagesPage;
