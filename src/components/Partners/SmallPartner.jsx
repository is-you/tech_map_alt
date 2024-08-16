import React, { useState } from "react";
import more_img from "../../assets/more_info.svg";
import "./Partner.css";

export default function smallPartner({
  image,
  link,
  styles,
  code,
  name,
  inn,
  target,
}) {
  const handleClick = () => {
    if (link) {
      window.open(link, target);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="smallPartner" style={styles}>
        <div className="smallPartner__image" onClick={handleClick}>
          <img src={image} alt="" />
        </div>
        <div className="smallPartner__ellipses" onClick={openModal}>
          <img src={more_img} alt="" />
        </div>
        <div>
          {isOpen && (
            <div className="smallModal">
              <div className="smallModal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <div
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {code}
                </div>
                <div>О рекламодателе:</div>
                <div>{name}</div>
                <div>{inn}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
