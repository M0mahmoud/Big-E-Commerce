import Link from "next/link";
import React from "react";

const DropdownLink = React.forwardRef(({ href, children, ...rest }, ref) => {
  return (
    <Link href={href} {...rest} ref={ref}>
      {children}
    </Link>
  );
});
DropdownLink.displayName = "DropdownLink";

export default DropdownLink;
