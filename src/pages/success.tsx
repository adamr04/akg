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
          copy="Bitte bezahlen Sie per Banküberweisung oder Bar an ausgewählten Terminen in der Schule, wo die Karten vorher auch abgeholt werden können."
        />
        <p className="text-center font-semibold">
          Verein Schulball AkG:<br />IBAN AT102011184050260200
        </p>
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
