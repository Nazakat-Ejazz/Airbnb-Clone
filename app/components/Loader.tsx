"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
      <div>
        <h1 className="text-red-500">Loading...</h1>
      </div>
    </div>
  );
};

export default Loader;
