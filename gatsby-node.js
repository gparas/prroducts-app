const _ = require(`lodash`);
const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createContentDigest,
}) => {
  const { createNode } = actions;

  let fileNode;
  if (node.internal.type === 'DemoProducts') {
    try {
      fileNode = await createRemoteFileNode({
        url: node.image,
        store,
        cache,
        createNode,
        createNodeId: createContentDigest,
      });
    } catch (e) {
      console.error('ERROR:', e);
    }
  }
  // Adds a field `localImage` or custom name to the node
  // ___NODE appendix tells Gatsby that this field will link to another node
  if (fileNode) {
    node.localImage___NODE = fileNode.id;
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const productPage = path.resolve('src/templates/product.js');
    // const tagPage = path.resolve("src/templates/tag.jsx");
    const categoryPage = path.resolve('src/templates/category.js');
    resolve(
      graphql(
        `
          {
            allDemoProducts(limit: 1000) {
              edges {
                node {
                  id
                  category
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        // const tagSet = new Set();
        const categorySet = new Set();
        result.data.allDemoProducts.edges.forEach(edge => {
          // if (edge.node.tags) {
          //   edge.node.tags.forEach(tag => {
          //     tagSet.add(tag);
          //   });
          // }

          if (edge.node.category) {
            categorySet.add(edge.node.category);
          }

          createPage({
            path: edge.node.id,
            component: productPage,
            context: {
              id: edge.node.id,
            },
          });
        });

        // const tagList = Array.from(tagSet);
        // tagList.forEach(tag => {
        //   createPage({
        //     path: `/tags/${_.kebabCase(tag)}/`,
        //     component: tagPage,
        //     context: {
        //       tag
        //     }
        //   });
        // });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category,
            },
          });
        });
      })
    );
  });
};
