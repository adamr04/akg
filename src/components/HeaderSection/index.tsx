import React from "react";
import { Container, CalloutHeading } from "@/components";

import "./HeaderSection.styles.css";

type HeaderSectionProps = {
  className?: string;
  copy: string;
  title: string;
};

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  copy,
}) => {
  return (
    <>
      <div className="header-section">
        <Container>
          <section>
            <h1 className="title" itemProp="headline">
              {title}
            </h1>
            <p className="lead">{copy}</p>
          </section>
        </Container>
      </div>
    </>
  );
};
