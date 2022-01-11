const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for page
  const pageTemplate = path.resolve(`./src/templates/Page/index.tsx`);
  // Get all markdown pages
  const resultPage = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { type: { eq: "page" } } }
          sort: { fields: [frontmatter___order], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );
  // Create pages
  const pages = resultPage.data.allMdx.edges;
  if (pages.length > 0) {
    pages.forEach((page, index) => {
      createPage({
        path: page.node.slug,
        component: pageTemplate,
        context: {
          id: page.node.id,
        },
      });
    });
  }
  if (resultPage.errors) {
    reporter.panicOnBuild(
      `There was an error loading the articles.`,
      resultPage.errors
    );
    return;
  }
  ///////////////////////////////////////
  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/BlogPost/index.tsx`);
  // Get all markdown blog posts sorted by date
  const resultPosts = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { type: { eq: "article" } } }
          sort: { fields: [frontmatter___order], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              id
              slug
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  );
  if (resultPosts.errors) {
    reporter.panicOnBuild(
      `There was an error loading the articles.`,
      resultPosts.errors
    );
    return;
  }
  // Create blog posts pages
  const posts = resultPosts.data.allMdx.edges;
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].node.id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].node.id;
      createPage({
        path: post.node.slug,
        component: blogPostTemplate,
        context: {
          id: post.node.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  };
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      linkedin: String
      medium: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      tags: String
    }

    type Fields {
      slug: String
    }
  `);
};
