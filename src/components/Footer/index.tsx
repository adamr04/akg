import React from "react";
import { EmptyProps } from "@/definitions";
import { Nav } from "@/components";

import "./Footer.styles.css";

const navigation = {
  links: [
    { name: "Home", to: "/" },
    { name: "Archiv", to: "/archive" },
    { name: "Datenschutz", to: "/privacy" },
  ],
};

export const Footer: React.FC<EmptyProps> = () => {
  const { links } = navigation;
  return (
    <footer className="footer">
      <Nav links={links} />
      <p className="copyright">
        &copy; {new Date().getFullYear()}{" "}
        <span>
          Verein Schulball Akademisches Gymnasium Wien. Alle Rechte vorbehalten.
        </span>
      </p>
      <p className="copyright">
        Website by Matthias Grieder,{" "}
        <a href="https://www.ebcont.com" target="_blank">
          Digital is now
        </a>
      </p>
    </footer>
  );
};
