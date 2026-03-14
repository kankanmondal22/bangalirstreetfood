import BookingReceipt from "@/components/BookingReceipt";
import db from "@/db";
import { bookingsTable, packagesTable, travelDatesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const paymentId = params.paymentId;

  if (!paymentId || typeof paymentId !== "string") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded bg-white p-8 text-center shadow">
          <h1 className="mb-4 text-2xl font-bold">Invalid Payment ID</h1>
          <p className="text-gray-600">No valid payment ID provided.</p>
        </div>
      </main>
    );
  }

  const [bookingData] = await db
    .select({
      bookingId: bookingsTable.id,
      packageTitle: packagesTable.packageTitle,
      duration: packagesTable.duration,
      travelDate: travelDatesTable.startDate,
      noOfAdults: bookingsTable.noOfAdults,
      noOfChildren: bookingsTable.noOfChildren,
      pricePerAdult: packagesTable.amountPerAdult,
      pricePerChild: packagesTable.amountPerChild,
      bookingAmount: bookingsTable.amountPaid,
      primaryContactName: bookingsTable.customerFirstName,
      primaryContactEmail: bookingsTable.customerEmail,
      primaryContactPhone: bookingsTable.customerPhone,
    })
    .from(bookingsTable)
    .innerJoin(
      travelDatesTable,
      eq(bookingsTable.travelDateId, travelDatesTable.id),
    )
    .innerJoin(packagesTable, eq(travelDatesTable.packageId, packagesTable.id))
    .where(eq(bookingsTable.razorpayPaymentId, paymentId));

  if (!bookingData) {
    throw new Error("Booking not found");
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-12">
      <BookingReceipt bookingData={bookingData} />
    </main>
  );
}
