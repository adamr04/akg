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
  video?: string;
};

export const Hero: React.FC<HeroProps> = ({
  location,
  date,
  title,
  cover,
  video,
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
        {video ? (
          <div className="heroBackground">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute object-cover w-full h-full blur-md opacity-70"
            >
              <source
                src="https://media.istockphoto.com/videos/dancers-performing-latin-dance-red-light-background-ballroom-couple-video-id1324301062"
                type="video/webm"
              />
            </video>
          </div>
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
