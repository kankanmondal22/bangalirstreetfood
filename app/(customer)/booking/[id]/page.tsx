import BookingForm from "@/components/forms/BookingForm";
import { packageData } from "@/mockData";
import { UUID } from "crypto";
import Image from "next/image";

const BookPackage = async ({
  params,
}: {
  params: Promise<{ id: string | UUID }>;
}) => {
  const packageId = await params.then((p) => p.id);
  const packageDetails = packageData.find((pkg) => pkg.id === packageId);

  return (
    <div className="bg-gray-100 flex flex-col gap-8 py-12">
      <div className=" mx-auto">
        <div className="">
          <Image
            src={packageDetails?.images[0] || "/placeholder.jpg"}
            alt="Package Image"
            width={1500}
            height={1500}
            loading="eager"
            className="rounded-lg overflow-hidden aspect-video object-cover w-full"
          />
        </div>
        <BookingForm />
      </div>
    </div>
  );
};

export default BookPackage;
