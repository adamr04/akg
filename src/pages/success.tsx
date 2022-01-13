import * as React from "react";
import { graphql } from "gatsby";

import { Layout, Hero, Seo, Button } from "@/components";
import { PageProps } from "@/definitions";

const ThankYouPage: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Danke für Ihre Bestellung" />
      <Hero title="Danke!">
        <p className="text-center">
          Wir haben Ihre Bestellung erhalten und werden uns in Kürze bei Ihnen melden.
        </p>
        <p className="text-center">
          <Button as="link" to="/">
            Zurück zu Home
          </Button>
        </p>
      </Hero>
    </Layout>
  );
};

export default ThankYouPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
