import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fan, Train } from "lucide-react";
import Link from "next/link";

const mockBookingData = {
  id: "12345",
  packageTitle: "Amazing Thailand Tour",
  travelDate: "2024-12-15",
  noOfAdults: 2,
  noOfChildren: 1,
  bookingAmount: 1500,
  status: "Confirmed",
  trainticket: "awsome-train-ticket-12345.pdf",
  ticketType: "sleeper",
};

const CheckBookingStatusForm = ({ bookingId }: { bookingId?: string }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold">Check Your Booking Status</h2>
      <p className="text-gray-700">
        Please provide a booking ID to check the status of your booking.
      </p>
      <form className="my-4 flex gap-4" method="GET">
        <Label htmlFor="bookingId" className="text-lg">
          Booking ID
        </Label>
        <Input
          type="text"
          id="bookingId"
          name="bookingId"
          required
          className="w-80"
          defaultValue={bookingId}
        />
        <Button type="submit">Check Status</Button>
      </form>
    </>
  );
};

const CheckBookingStatus = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { bookingId } = await searchParams;

  if (!bookingId) {
    // return a form to input booking ID or show an error message
    return (
      <div className="mx-auto w-full max-w-6xl p-8">
        <CheckBookingStatusForm />
      </div>
    );
  }

  console.log("Booking ID: ", bookingId);

  return (
    <div className="mx-auto w-full max-w-6xl p-8">
      <CheckBookingStatusForm bookingId={bookingId} />
      <div className="bg-gray-100 p-4">
        <h2 className="text-3xl font-semibold">
          Booking Status for ID: {bookingId}
        </h2>
        <div>
          <p>
            <strong>Package Title:</strong> {mockBookingData.packageTitle}
          </p>
          <p>
            <strong>Travel Date:</strong> {mockBookingData.travelDate}
          </p>
          <p>
            <strong>Number of Adults:</strong> {mockBookingData.noOfAdults}
          </p>
          <p>
            <strong>Number of Children:</strong> {mockBookingData.noOfChildren}
          </p>
          <p>
            <strong>Booking Amount:</strong> $
            {mockBookingData.bookingAmount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {mockBookingData.status}
          </p>
          <p>
            <strong>Train Ticket:</strong> {mockBookingData.trainticket}
          </p>
          <p>
            <strong>Ticket Type:</strong> {mockBookingData.ticketType}
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <Button asChild>
            <Link href={"#"}>
              <Train className="mr-2" />
              View Train Ticket
            </Link>
          </Button>
          <Button variant="outline">
            <Fan />
            Request Updating to AC Ticket (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckBookingStatus;
