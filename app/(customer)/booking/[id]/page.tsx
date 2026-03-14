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
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">Package not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex flex-col gap-8 py-12">
      <div className=" mx-auto">
        <div className="relative ">
          <Image
            src={"/pahar.jpeg"}
            alt="Package Image"
            width={1500}
            height={1500}
            loading="eager"
            priority
            className="rounded-xl mb-4 overflow-hidden object-cover w-full max-h-96"
          />
          <div className="absolute z-1 inset-0 bg-linear-to-t from-black/60 to-transparent rounded-xl"></div>

          <div className="absolute z-2 bottom-4 left-4 text-white px-4 py-2 rounded">
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
