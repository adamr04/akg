import * as React from "react";
import { graphql, Link } from "gatsby";
import { INode, PageProps } from "@/definitions";
import { Layout, ArticleCard, Container, Hero, Seo } from "@/components";
import cover from "@/images/cover.png";

const Home: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Der 43. Schulball des Akademischen Gymnasiums Wien" />
      <Hero
        title="Casino Royale"
        date="20. Mai 2022"
        location="Palais Auersperg Wien"
        video
      >

        <p>
          Der 43. Schulball des Akademischen Gymnasium Wien steht ganz im Motto
          CASINO ROYALE. Das Fest fand am 20. Mai 2022 im Palais Auersperg statt.
          Wir bedanken uns herzlichst bei allen Besuchern und Unterstützern und freuen uns bereits auf den nächsten Ball!
        </p>
        
        <p>
          TEST
        </p>

        <iframe width="420" height="315" class="center" src="https://www.youtube.com/embed/urJgFAeO2xw"> </iframe>

        <div className="action">
          <Link to="/reservation">Karten reservieren</Link>
        </div>

      </Hero>
      <Container>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {posts.map(({ node }: { node: INode }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <li key={node.fields.slug} className="group">
                <ArticleCard
                  link={node.fields.slug}
                  title={title}
                  description={node.frontmatter.description}
                  tags={node.frontmatter.tags}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "article" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            description
            tags
          }
        }
      }
    }
  }
`;
