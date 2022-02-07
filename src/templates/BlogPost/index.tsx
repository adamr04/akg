import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  Layout,
  HeaderSection,
  Container,
  Seo,
} from "@/components";
import { PageProps } from "@/definitions";

import "./BlogPost.styles.css";

const BlogPostTemplate: React.FC<PageProps> = ({ data, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Container>
        <article
          className="article"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="col-start-1">
            <HeaderSection
              title={post.frontmatter.title}
              copy={post.frontmatter.description}
            />
          </header>
          <section
            itemProp="articleBody"
            className="prose prose-xl mt-8 mx-auto"
          >
            <MDXRenderer localImages={post.frontmatter.embeddedImagesLocal}>{post.body}</MDXRenderer>
          </section>
        </article>
        <nav className="mt-16 py-8 grid grid-cols-blog border-t border-skin-base-muted">
          <ul className="col-start-2 text-lg flex flex-wrap justify-between">
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev" className="py-2">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next" className="py-2">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        order
        type
        title
        description
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        order
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        order
      }
    }
  }
`;
