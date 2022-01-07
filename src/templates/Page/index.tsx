import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  Layout,
  CalloutHeading,
  DefinitionList,
  Container,
  Seo,
} from "@/components";
import { PageProps } from "@/definitions";

import "./Page.styles.css";

const PageTemplate: React.FC<PageProps> = ({ data, location }) => {
  const page = data.mdx;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
      />
      <Container>
        <article
          className="article"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="col-start-1">
            <CalloutHeading itemProp="headline" text={page.frontmatter.title} />
          </header>
          <section
            itemProp="articleBody"
            className="prose prose-xl mt-24 mx-auto"
          >
            <MDXRenderer>{page.body}</MDXRenderer>
          </section>
        </article>
      </Container>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        description
        type
      }
    }
  }
`;
