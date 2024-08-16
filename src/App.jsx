import React from "react";
import MapPC from "./components/MapPC";
import MapMobile from "./components/MapMobile";
import "./index.css";

export default function App() {
  const preventZoom = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };
  document.addEventListener("wheel", preventZoom, { passive: false });
  const preventBrowserZoom = (event) => {
    if (event.ctrlKey && (event.key === "+" || event.key === "-")) {
      event.preventDefault();
    }
  };
  document.addEventListener("keydown", preventBrowserZoom);

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      "iphone",
      "ipod",
      "android",
      "blackberry",
      "windows phone",
    ];

    return mobileKeywords.some((keyword) => userAgent.includes(keyword));
  };

  return isMobileDevice() ? <MapMobile /> : <MapPC />;
}
