import BookingReceipt from "@/components/BookingReceipt";

// Placeholder booking data – replace with real data from your API/state
const bookingTable = [
  {
    bookingId: "BSF-20260302-0012",
    packageTitle: "Kerala Backwaters",
    duration: "3N/4D",
    travelDate: "2026-03-17",
    noOfAdults: 2,
    noOfChildren: 1,
    pricePerAdult: 5000,
    pricePerChild: 3000,
    bookingAmount: 5000,
    primaryContactName: "John Doe",
    primaryContactEmail: "john@example.com",
    primaryContactPhone: "9876543210",
  },
];

// http://localhost:3000/booking/success?bookingId=BSF-20260302-0012

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const bookingId = params.bookingId;
  const bookingData = bookingTable.find(
    (booking) => booking.bookingId === bookingId,
  );
  if (!bookingData) {
    throw new Error("Booking not found");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <BookingReceipt bookingData={bookingData} />
    </main>
  );
}
