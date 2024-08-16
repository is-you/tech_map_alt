import React from "react";
import BigPartner from "./BigPartner";
import SmallPartner from "./SmallPartner";
import partnersData from "../../database/partnersData";
import anidex from "../../assets/anidex.svg";

export default function AllPartners() {
  return (
    <>
      {partnersData.map((partner, index) => {
        const { image, link, code, name, inn, target } = partner;
        if (index < 4) {
          return (
            <BigPartner
              key={index}
              image={image}
              target={target}
              link={link}
              code={code}
              name={name}
              inn={inn}
              styles={{
                position: "absolute",
                top: "32px",
                left: `${1470 + index * 348}px`,
              }}
            />
          );
        } else {
          return (
            <SmallPartner
              key={index}
              image={image}
              target={target}
              link={link}
              code={code}
              name={name}
              inn={inn}
              styles={{
                position: "absolute",
                left: `${515 + (index - 4) * 232}px`,
                bottom: "57px",
              }}
            />
          );
        }
      })}
      <img
        src={anidex}
        style={{
          position: "absolute",
          left: "2141px",
          bottom: "57px",
          width: "198px",
          height: "198px",
        }}
      />
    </>
  );
}
