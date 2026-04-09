import React from "react";

const Heading2 = ({
  className,
  subHeading,
  subHeadingClassName,
  children,
}: {
  className?: string;
  subHeadingClassName?: string;
  subHeading?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <h2
        className={`text-center text-3xl font-bold text-teal-600 lg:text-4xl xl:text-5xl ${subHeading ? "mb-2" : "mb-12 lg:mb-16"} ${className}`}
      >
        {children}
      </h2>
      {subHeading && (
        <p
          className={`mb-12 text-center text-sm text-gray-600 sm:text-base lg:mb-16 lg:text-base xl:text-lg ${subHeadingClassName}`}
        >
          {subHeading}
        </p>
      )}
    </>
  );
};

export default Heading2;
