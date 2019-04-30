const _ = require(`lodash`);
const path = require(`path`);
const slug = require(`slug`);
const slash = require(`slash`);
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

  return graphql(
    `
      {
        allDemoProducts(limit: 1000) {
          edges {
            node {
              id
              collection
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const productTemplate = path.resolve(`src/templates/product.js`);
    const collectionTemplate = path.resolve(`src/templates/collection.js`);
    const products = result.data.allDemoProducts.edges;

    //All tags
    let allTags = [];
    // Iterate through each post, putting all found tags into `allTags array`
    _.each(products, edge => {
      if (_.get(edge, 'node.collection')) {
        allTags = allTags.concat(edge.node.collection);
      }
    });
    // Eliminate duplicate tags
    allTags = _.uniq(allTags);

    allTags.forEach((tag, index) => {
      createPage({
        path: `/${slug(tag)}/`,
        component: collectionTemplate,
        context: {
          tag,
        },
      });
    });

    products.forEach(({ node }, index) => {
      createPage({
        path: `/${slug(node.id)}/`,
        component: slash(productTemplate),
        context: {
          id: node.id,
          prev: index === 0 ? null : products[index - 1],
          next: index === result.length - 1 ? null : products[index + 1],
        },
      });
    });
    return;
  });
};
