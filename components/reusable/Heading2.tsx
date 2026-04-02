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
        className={`mb-4 text-center text-3xl font-bold text-teal-600 ${className}`}
      >
        {children}
      </h2>
      <p
        className={`text-center text-sm text-gray-600 sm:text-base ${subHeadingClassName}`}
      >
        {subHeading}
      </p>
    </>
  );
};

export default Heading2;
