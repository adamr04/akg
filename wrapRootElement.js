/* eslint-disable */
import React from "react";
import { Location } from "@reach/router";
import { MDXProvider } from "@mdx-js/react";

const App = ({ element, location }) => {
  return <MDXProvider>{element}</MDXProvider>;
};

const wrapRootElement = ({ element }) => (
  <Location>{(location) => <App {...{ element }} {...location} />}</Location>
);

export { wrapRootElement };
