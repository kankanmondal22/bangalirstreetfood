import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="mx-auto my-6 flex w-full max-w-6xl gap-6">
        <div className="flex h-64 w-full basis-2/3 items-center justify-center bg-rose-200">
          <p className="text-gray-500">Content Area</p>
        </div>
        <div className="basis-1/3 border-3 border-dashed border-yellow-500 p-4 text-yellow-700">
          <p className="font-bold">Notice</p>
          <ul className="list-disc pl-5">
            <li>HURRY UP kerala</li>
            <li>Add your second point here.</li>
            <li>Add your third point here.</li>
          </ul>
        </div>
      </div>
      <div className="mask-[url(/stamp.png)] mask-contain mask-no-repeat">
        <Image
          src="/pahar.jpeg"
          alt="Sample Image"
          width={600}
          height={400}
          className=""
        />
      </div>
    </div>
  );
};

export default Home;
