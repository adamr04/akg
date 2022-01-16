module.exports = {
  pathPrefix: `/akg`,
  siteMetadata: {
    title: "Schulball - Akademisches Gymnasium Wien",
    author: {
      name: `Matthias Grieder`,
    },
    description: `Ballroom des Akademischen Gymansium Wien`,
    siteUrl: `https://akg-ballroom.netlify.app`,
    social: {
      github: `zeitvertrieb/akg`,
    },
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    // Articles
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/articles`,
        name: "articles",
      },
    },
    // Pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___order] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      slug
                      frontmatter {
                        order
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "AKG RSS feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ballroom`,
        short_name: `AKG Ballroom`,
        start_url: `/`,
        background_color: `#0c0e14`,
        theme_color: `#0c0e14`,
        display: `minimal-ui`,
        icon: `src/images/akg-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
