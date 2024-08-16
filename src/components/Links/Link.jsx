import React from "react";
import "./Link.css";

export default function Link({ target, styles, href, children }) {
  return (
    <a target={target} href={href} style={styles}>
      {children}
    </a>
  );
}
