import classnames from "classnames";
import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { ReactNode } from "react";
import { GoSync } from "react-icons/go";

type ActiveButtonProps = {
  children?: ReactNode;
  amazon?: boolean;
  left?: boolean;
  right?: boolean;
  loading?: boolean;
};

function ActiveButton({
  children,
  amazon,
  left,
  right,
  loading,
  ...props
}: PropsWithChildren<ActiveButtonProps> & ComponentPropsWithoutRef<"button">) {
  const classes = classnames(
    props.className,
    "flex items-center px-3 py-1.5 text-gray-800 border-2 border-gray-400 hover:bg-gray-200 shadow-md rounded",
    {
      "opacity-80": loading,
      "border-gray-400 bg-orange-200 text-gray-800 hover:bg-orange-300": amazon,
      "border-1 border-b-4 border-r-4": left,
      "border-1 border-b-4 border-l-4": right,
      "bg-white": !amazon,
    }
  );

  return (
    <button {...props} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

// ActiveButton.propTypes = {
//   checkVariationValue: ({ primary, amazon }: ActiveButtonProps) => {
//     const count = Number(!!primary) + Number(!!amazon);

//     if (count > 1) {
//       return new Error(
//         "Only one of primary, secondary, success, warning, danger can be true"
//       );
//     }
//   },
// };

export default ActiveButton;
