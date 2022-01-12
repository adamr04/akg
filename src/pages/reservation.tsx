import * as React from "react";
import { graphql } from "gatsby";
import { PageProps } from "@/definitions";
import {
  Layout,
  Container,
  Seo,
  HeaderSection,
  ReservationForm,
} from "@/components";
import cover from "@/images/cover.png";

const Reservation: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Karten reservieren" />
      <Container>
        <HeaderSection
          title="Karten reservieren"
          copy="Aufgrund der COVID Bestimmungen müssen Karten personalisiert sein. Alle eingegebenen Daten unterliegen dem Datenschutzgesetz und werden nach dem Schulball gelöscht."
        />
        <ReservationForm />
      </Container>
    </Layout>
  );
};

export default Reservation;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
