import React from "react";
import Link from "./Link";
import links from "../../database/linkData";

export default function AllLinks() {
  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          styles={link.styles}
          target={link.target}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
