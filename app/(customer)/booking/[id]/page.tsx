import { getPackageDetailsByIdForBooking } from "@/actions/package.action";
import BookingForm from "@/components/forms/BookingForm";
import { UUID } from "crypto";
import Image from "next/image";
import { toast } from "sonner";

const BookPackage = async ({
  params,
}: {
  params: Promise<{ id: string | UUID }>;
}) => {
  const packageId = await params.then((p) => p.id);
  console.log("Package ID: ", packageId);

  const packageDetails = await getPackageDetailsByIdForBooking(packageId)
    .then((res) => res)
    .catch((err) => {
      toast.error("Failed to fetch package details. Please try again later.");
      console.error("Error fetching package details:", err);
    });

  if (!packageDetails) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">Package not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-gray-100 py-12">
      <div className="mx-auto">
        <div className="relative">
          <Image
            src={"/pahar.jpeg"}
            alt="Package Image"
            width={1500}
            height={1500}
            loading="eager"
            priority
            className="mb-4 max-h-96 w-full overflow-hidden rounded-xl object-cover"
          />
          <div className="absolute inset-0 z-1 rounded-xl bg-linear-to-t from-black/60 to-transparent"></div>

          <div className="absolute bottom-4 left-4 z-2 rounded px-4 py-2 text-white">
            <h2 className="text-2xl font-bold">
              {packageDetails?.title || "Package Title"}
            </h2>
            <p className="text-sm">{packageDetails?.duration || "Duration"}</p>
          </div>
        </div>
        <BookingForm packageDetails={packageDetails} packageId={packageId} />
      </div>
    </div>
  );
};

export default BookPackage;
