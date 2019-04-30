import React from 'react';
import { graphql, Link } from 'gatsby';
import slug from 'slug';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/layout';

export default props => {
  const product = props.data.demoProducts;
  const { prev, next } = props.pageContext;
  return (
    <Layout modalBackgroundPath={`/${product.collection}/`} isModal={true}>
      <Typography gutterBottom variant="h6" component="h3">
        {product.title}
      </Typography>
      <Typography>{product.price}</Typography>
      {prev && (
        <Link to={`/${product.collection}/${slug(prev.node.id)}/`}>prev</Link>
      )}
      {next && (
        <Link to={`/${product.collection}/${slug(next.node.id)}/`}>next</Link>
      )}
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    demoProducts(id: { eq: $id }) {
      title
      price
      collection
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
