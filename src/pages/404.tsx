import * as React from "react";
import { graphql } from "gatsby";

import { Layout, Hero, Seo, Button } from "@/components";
import { PageProps } from "@/definitions";

const NotFoundPage: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <Hero title="Sorry.">
        <p className="text-center">Es scheint als ist diese Seite auf Urlaub.</p>
        <p className="text-center">
          <Button as="link" to="/">
            Zurück zu Home
          </Button>
        </p>
      </Hero>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
