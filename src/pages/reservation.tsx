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

const Reservation: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Karten reservieren" />
      <Container>
        <HeaderSection
          title="Karten reservieren"
          copy="Bestellen Sie hier Ihre Karten. Wir freuen uns auf ein tolles gemeinsames Fest!"
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
