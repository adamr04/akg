import React from "react";
import { HeadingsProps } from "@/definitions";

export const CalloutHeading: React.FC<HeadingsProps> = ({ text }) => {
  return (
    <h1
      className="h1 text-center pt-16 max-w-4xl mx-auto"
      data-aos="zoom-out"
      data-aos-delay="50"
      data-aos-duration="300"
      data-aos-easing="ease-in-cubic"
    >
      {text}
    </h1>
  );
};
