import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Buttons from "./Buttons/Buttons";
import AllPartners from "./Partners/AllPartners";
import AllLinks from "./Links/AllLinks";
import bg from "../assets/bg.svg";
import text from "../assets/text.svg";


export default function MapPC() {
  const containerRef = useRef(null);
  const buttonsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.2);
  const [minScale, setMinScale] = useState(0);
  const [maxScale, setMaxScale] = useState(2);

  useEffect(() => {
    const handleMouseDown = (event) => {
      event.preventDefault();
      setIsDragging(true);
      setStartX(event.clientX);
      setStartY(event.clientY);
    };

    containerRef.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      containerRef.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useLayoutEffect(() => {
    const centerMap = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mapWidth = 2860;
      const mapHeight = 1993;

      const centerContainerX = containerWidth / 2;
      const centerContainerY = containerHeight / 2;

      setOffsetX(centerContainerX - (mapWidth * scale) / 2);
      setOffsetY(centerContainerY - (mapHeight * scale) / 2);
      setIsLoading(false);

      const minScale = windowWidth / mapWidth;
      setMinScale(minScale);
    };

    centerMap();
    window.addEventListener("resize", centerMap);
    return () => window.removeEventListener("resize", centerMap);
  }, [containerWidth, containerHeight]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setStartX(event.clientX);
      setStartY(event.clientY);
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        event.preventDefault();
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        setOffsetX((prevOffsetX) => {
          const newOffsetX = prevOffsetX + deltaX;
          const maxOffsetX = containerWidth - 2860 * scale;
          return Math.min(0, Math.max(maxOffsetX, newOffsetX));
        });

        setOffsetY((prevOffsetY) => {
          const newOffsetY = prevOffsetY + deltaY;
          const maxOffsetY = containerHeight - 1993 * scale;
          return Math.min(0, Math.max(maxOffsetY, newOffsetY));
        });

        setStartX(event.clientX);
        setStartY(event.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    const container = containerRef.current;
    setContainerWidth(container.offsetWidth);
    setContainerHeight(container.offsetHeight);

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, containerWidth, containerHeight, startX, startY, scale]);

  const handleZoomIn = () => {
    const containerWidthHalf = containerWidth / 2;
    const containerHeightHalf = containerHeight / 2;

    const centerX = (containerWidthHalf - offsetX) / scale;
    const centerY = (containerHeightHalf - offsetY) / scale;

    const newScale = scale + 0.08;

    const newOffsetX = containerWidthHalf - centerX * newScale;
    const newOffsetY = containerHeightHalf - centerY * newScale;

    if (newScale > maxScale) return;
    else {
      setScale(Math.min(2, newScale));
      setOffsetX((prevOffsetX) => {
        const maxOffsetX = containerWidth - 2860 * newScale;
        return Math.min(0, Math.max(maxOffsetX, newOffsetX));
      });
      setOffsetY((prevOffsetY) => {
        const maxOffsetY = containerHeight - 1993 * newScale;
        return Math.min(0, Math.max(maxOffsetY, newOffsetY));
      });
    }
  };

  const handleZoomOut = () => {
    const containerWidthHalf = containerWidth / 2;
    const containerHeightHalf = containerHeight / 2;

    const centerX = (containerWidthHalf - offsetX) / scale;
    const centerY = (containerHeightHalf - offsetY) / scale;

    const newScale = scale - 0.08;

    const newOffsetX = containerWidthHalf - centerX * newScale;
    const newOffsetY = containerHeightHalf - centerY * newScale;

    setScale(Math.max(minScale, newScale));
    setOffsetX((prevOffsetX) => {
      const maxOffsetX = containerWidth - 2860 * newScale;
      return Math.min(0, Math.max(maxOffsetX, newOffsetX));
    });
    setOffsetY((prevOffsetY) => {
      const maxOffsetY = containerHeight - 1993 * newScale;
      return Math.min(0, Math.max(maxOffsetY, newOffsetY));
    });
  };

  const handleWheel = (event) => {
    event.preventDefault();

    const mapX =
      (event.clientX -
        containerRef.current.getBoundingClientRect().left -
        offsetX) /
      scale;
    const mapY =
      (event.clientY -
        containerRef.current.getBoundingClientRect().top -
        offsetY) /
      scale;

    const newScale = scale + event.deltaY * -0.0008;

    const newOffsetX =
      event.clientX -
      containerRef.current.getBoundingClientRect().left -
      mapX * newScale;
    const newOffsetY =
      event.clientY -
      containerRef.current.getBoundingClientRect().top -
      mapY * newScale;

    if (newScale > maxScale) return;
    else {
      setScale(Math.min(Math.max(minScale, newScale), 2));
      setOffsetX((prevOffsetX) => {
        const maxOffsetX = containerWidth - 2860 * newScale;
        return Math.min(0, Math.max(maxOffsetX, newOffsetX));
      });
      setOffsetY((prevOffsetY) => {
        const maxOffsetY = containerHeight - 1993 * newScale;
        return Math.min(0, Math.max(maxOffsetY, newOffsetY));
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
      onWheel={handleWheel}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {isLoading ? null : (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "2860px",
                height: "1993px",
                position: "absolute",
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <img
                src={bg}
                alt="Map"
                style={{ width: "100%", height: "100%" }}
              />
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
        )}
      </div>
      <div
        ref={buttonsRef}
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "1000",
        }}
      >
        <Buttons onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
    </div>
  );
}
