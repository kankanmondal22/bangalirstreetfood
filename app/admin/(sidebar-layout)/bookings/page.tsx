import { toast } from "sonner";
import { getTravelDates } from "../../_actions/bookings";
import PageTitle from "../../_components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const BookingPages = async () => {
  const travelDates = await getTravelDates()
    .then((data) => data)
    .catch((err) => {
      toast.error("Error fetching travel dates: " + err.message);
      return [];
    });
  return (
    <div>
      <PageTitle title="Bookings">
        {/* <Button size="xl">
          <Download />
          Download as CSV
        </Button> */}
      </PageTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {travelDates.length > 0 &&
          travelDates.map((item) => (
            <Card key={item.id} className="shadow">
              <CardHeader>
                <CardTitle>{item.packageName}</CardTitle>
                <CardDescription>On: {item.date}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>
                  <Link href={`/admin/bookings/${item.id}`}>View Bookings</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default BookingPages;
