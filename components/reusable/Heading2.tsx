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
        className={`text-center text-3xl font-bold text-teal-600 ${subHeading ? "mb-2" : "mb-12 lg:mb-16"} ${className}`}
      >
        {children}
      </h2>
      {subHeading && (
        <p
          className={`mb-12 text-center text-sm text-gray-600 sm:text-base lg:mb-16 ${subHeadingClassName}`}
        >
          {subHeading}
        </p>
      )}
    </>
  );
};

export default Heading2;
