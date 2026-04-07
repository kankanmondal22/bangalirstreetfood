import React from "react";

const HomeSections = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`mx-auto max-w-6xl p-8 py-24 xl:py-32 ${className}`}>
      {children}
    </div>
  );
};

export default HomeSections;
