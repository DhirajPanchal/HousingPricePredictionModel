import classNames from "classnames";
import React, { ComponentPropsWithoutRef } from "react";

// type ActivePanelProps = {

// }

function ActivePanel({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default ActivePanel;
