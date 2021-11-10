import React from "react";
import { EmptyProps } from "@/definitions";

import "./Footer.styles.css";

export const Footer: React.FC<EmptyProps> = () => {
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()}{" "}
        <span>Akademisches Gymnasium Wien. Alle Rechte vorbehalten.</span>
      </p>
    </footer>
  );
};
