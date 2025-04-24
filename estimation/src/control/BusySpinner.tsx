import React, { PropsWithChildren, useEffect, useState } from "react";
import { IoSyncSharp } from "react-icons/io5";

type BusySpinnerProps = {
  isLoading: any;
  isError?: any;
  className?: string;
};

const initialState = { first: true, style: "active-spin text-gray-600" };

export default function BusySpinner({
  isLoading=false,
  isError=false,
  className,
}: PropsWithChildren<BusySpinnerProps>) {
  const [type, setType] = useState<{ first: boolean; style: string }>(
    initialState
  );

  useEffect(() => {
    if (!isError && !isLoading) {
      if (!type.first) {
        setType((pre) => {
          return { ...pre, style: "active-spin text-green-600" };
        });
      }
    } else if (isLoading) {
      setType({
        first: false,
        style: "active-spin text-blue-600 animate-spin",
      });
    } else if (isError && !isLoading) {
      setType((pre) => {
        return { ...pre, style: "active-spin text-red-600" };
      });
    }
  }, [isLoading, isError]);

  return (
    <div className={className}>
      <IoSyncSharp className={type.style} />

      {/* {!isError && !isLoading && (
        <IoSyncSharp className="active-spin text-gray-600" />
      )}
      {isLoading && (
        <IoSyncSharp className="animate-spin active-spin text-blue-600" />
      )}
      {!isLoading && <IoSyncSharp className=" active-spin text-green-600" />}

      {isError && !isLoading && (
        <IoSyncSharp className=" active-spin text-red-600" />
      )} */}
    </div>
  );
}
