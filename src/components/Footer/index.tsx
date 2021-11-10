import React from "react";
import { EmptyProps } from "@/definitions";
import { Nav } from "@/components";

import "./Footer.styles.css";

const navigation = {
  links: [
    { name: "Home", to: "/" },
    { name: "Archiv", to: "/archives" },
    { name: "Privatsphäre", to: "/privacy" },
  ],
};

export const Footer: React.FC<EmptyProps> = () => {
  const { links } = navigation;
  return (
    <footer className="footer">
      <Nav links={links} />
      <p className="copyright">
        &copy; {new Date().getFullYear()}{" "}
        <span>Akademisches Gymnasium Wien. Alle Rechte vorbehalten.</span>
      </p>
    </footer>
  );
};
