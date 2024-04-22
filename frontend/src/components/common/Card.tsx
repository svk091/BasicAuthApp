import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen w-full grid place-items-center bg-gray-400'>
      <div className='rounded-md md:w-2/4 w-3/4  bg-white mx-auto my-auto p-10'>
        {children}
      </div>
    </div>
  );
};

export default Card;
