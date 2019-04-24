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
