import React from "react";
import zoomIn from "../../assets/zoomIn.svg";
import zoomOut from "../../assets/zoomOut.svg";
import "./Buttons.css";

export default function Buttons({ onZoomIn, onZoomOut }) {
  return (
    <div className="buttons">
      <div className="buttons__column">
        <div className="buttons__item" onClick={onZoomIn}>
          <img src={zoomIn} alt="zoomIn" />
        </div>
        <div className="buttons__item" onClick={onZoomOut}>
          <img src={zoomOut} alt="zoomOut" />
        </div>
      </div>
    </div>
  );
}
