import React, { useState, useEffect, useRef } from "react";
import AllPartners from "./Partners/AllPartners";
import AllLinks from "./Links/AllLinks";
import bg from "../assets/bg.svg";
import text from "../assets/text.svg";


export default function MapMobile() {
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);
  const [previousX, setPreviousX] = useState(null);
  const [previousY, setPreviousY] = useState(null);
  const [touchStartDistance, setTouchStartDistance] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [minScale, setMinScale] = useState(0);
  const [maxScale, setMaxScale] = useState(1.5);

  const imageWidth = 2860;
  const imageHeight = 1993;

  const calculateMinScale = () => {
    const maxHeightScale = window.innerHeight / imageHeight;
    const maxWidthScale = window.innerWidth / imageWidth;
    const newMinScale = Math.max(maxHeightScale, maxWidthScale);
    setMinScale(newMinScale);
    setScale(newMinScale);
  };

  useEffect(() => {
    calculateMinScale();

    const handleResize = () => {
      calculateMinScale();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageWidth, imageHeight]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setPreviousX(touch.clientX);
      setPreviousY(touch.clientY);
    } else if (e.touches.length === 2) {
      setTouchStartX(null);
      setTouchStartY(null);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && previousX !== null && previousY !== null) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - previousX;
      const deltaY = touch.clientY - previousY;
      const newOffsetX = Math.min(
        0,
        Math.max(offsetX + deltaX, window.innerWidth - imageWidth * scale)
      );
      const newOffsetY = Math.min(
        0,
        Math.max(offsetY + deltaY, window.innerHeight - imageHeight * scale)
      );
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
      setPreviousX(touch.clientX);
      setPreviousY(touch.clientY);
    }
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;

      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      if (touchStartX === null && touchStartY === null) {
        setTouchStartX(centerX);
        setTouchStartY(centerY);
        setTouchStartDistance(distance);
        return;
      }

      const scaleFactor = 0.002;
      let newScale = scale + (distance - touchStartDistance) * scaleFactor;

      newScale = Math.max(newScale, minScale);

      if (newScale > maxScale) return;
      else {
        const newCenterX = touchStartX - offsetX;
        const newCenterY = touchStartY - offsetY;

        const newOffsetX = Math.min(
          0,
          Math.max(
            centerX - (newCenterX * newScale) / scale,
            window.innerWidth - imageWidth * newScale
          )
        );
        const newOffsetY = Math.min(
          0,
          Math.max(
            centerY - (newCenterY * newScale) / scale,
            window.innerHeight - imageHeight * newScale
          )
        );

        setScale(newScale);
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
      }
    }
  };

  const handleTouchEnd = () => {
    setPreviousX(null);
    setPreviousY(null);
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        touchAction: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          width: `${imageWidth * scale}px`,
          height: `${imageHeight * scale}px`,
          position: "relative",
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
      >
        <div
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <img src={bg} alt="Map" style={{ width: "100%", height: "100%" }} />
          <img
            className="info"
            src={text}
            alt="Text"
            style={{ position: "absolute", top: "64px", left: "72px" }}
          />
          <AllPartners />
          <AllLinks />
        </div>
      </div>
    </div>
  );
}
