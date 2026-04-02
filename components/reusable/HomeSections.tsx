import React from 'react';

const HomeSections = ({className, children}:{
    className?: string;
    children?: React.ReactNode;
}) => {
  return (
    <div className= {`max-w-6xl mx-auto p-8 my-24 ${className}`}>{children}</div>
  )
}

export default HomeSections;