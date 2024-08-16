import React, { useState } from "react";
import more_img from "../../assets/more_info.svg";
import "./Partner.css";

export default function bigPartner({
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
      <div className="bigPartner" style={styles}>
        <div className="bigPartner__image" onClick={handleClick}>
          <img src={image} alt="" />
        </div>
        <div className="bigPartner__ellipses" onClick={openModal}>
          <img src={more_img} alt="" />
        </div>
        <div>
          {isOpen && (
            <div className="bigModal">
              <div className="bigModal-content">
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
