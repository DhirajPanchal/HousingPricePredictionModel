"use client";

import { ReactNode } from "react";

interface GraphCardProps {
  title: string;
  loading?: boolean;
  children: ReactNode;
}

export default function GraphCard({
  title,
  loading,
  children,
}: GraphCardProps) {
  return (
    <div className="border border-gray-200 rounded-md p-6 bg-white flex flex-col h-full">
      <div className="text-md font-semibold text-gray-800 mb-4">{title}</div>
      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading...
        </div>
      ) : (
        children
      )}
    </div>
  );
}
