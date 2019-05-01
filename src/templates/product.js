import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import slug from 'slug';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/layout';

export default props => {
  const product = props.data.demoProducts;
  const { prev, next } = props.pageContext;
  console.log(window.history.back);
  return (
    <Layout modalBackgroundPath={`/${product.category}/`} isModal={true}>
      <Img fixed={product.localImage.childImageSharp.fixed} />
      <Typography gutterBottom variant="h6" component="h3">
        {product.title}
      </Typography>
      <Typography>{product.price}</Typography>
      {prev && <Link to={`/${slug(prev.node.id)}/`}>prev</Link>}
      {next && <Link to={`/${slug(next.node.id)}/`}>next</Link>}
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    demoProducts(id: { eq: $id }) {
      title
      price
      category
      localImage {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }
`;
