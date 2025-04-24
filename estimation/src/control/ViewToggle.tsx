import React, { useState } from "react";

const CLASS_DEFAULT =
  "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2";
const CLASS_ACTIVE =
  "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 active";

type ViewToggleProps = {
  viewChange: (view: boolean) => void;
};

export default function ViewToggle({ viewChange }: ViewToggleProps) {
  const [isGrid, setIsGrid] = useState<boolean>(true);

  const switchView = (isGrid: boolean) => {
    viewChange(isGrid);
    setIsGrid(isGrid);
  };

  return (
    <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex p-1">
      <button
        className={isGrid ? CLASS_ACTIVE : CLASS_DEFAULT}
        id="grid"
        onClick={() => switchView(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-current w-4 h-4 mr-2"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>Prediction</span>
      </button>
      <button
        className={!isGrid ? CLASS_ACTIVE : CLASS_DEFAULT}
        id="list"
        onClick={() => switchView(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-current w-4 h-4 mr-2"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
        <span>History</span>
      </button>
    </div>
  );
}
