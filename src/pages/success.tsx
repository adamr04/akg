import * as React from "react";
import { graphql } from "gatsby";
import { PageProps } from "@/definitions";
import {
  Layout,
  Container,
  Seo,
  Button,
  HeaderSection,
} from "@/components";

const Success: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Karten reservieren" />
      <Container>
        <HeaderSection
          title="Danke für Ihre Bestellung!"
          copy="Wir haben Ihre Bestellung erhalten und werden uns in Kürze bei Ihnen melden."
        />
        <p className="text-center">
          <Button as="link" to="/">
            Zurück zu Home
          </Button>
        </p>
      </Container>
    </Layout>
  );
};

export default Success;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
