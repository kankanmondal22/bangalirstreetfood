import React from "react";

const HomeSections = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`mx-auto my-16 max-w-6xl p-8 py-18 ${className}`}>
      {children}
    </div>
  );
};

export default HomeSections;
