import React from "react";
import { Container, CalloutHeading } from "@/components";

import "./Hero.styles.css";

type HeroProps = {
  children?: React.ReactNode;
  className?: string;
  date?: string;
  location?: string;
  title: string;
  cover?: string;
};

export const Hero: React.FC<HeroProps> = ({
  location,
  date,
  title,
  cover,
  children,
}) => {
  return (
    <>
      <div className="hero">
        {cover ? (
          <div
            className="heroBackground"
            style={{ backgroundImage: `url(${cover})` }}
          />
        ) : null}
        <Container>
          <section>
            <CalloutHeading itemProp="headline" text={title} />
            <p className="lead">
              {date} — {location}
            </p>
          </section>
          <section>{children}</section>
        </Container>
      </div>
    </>
  );
};
