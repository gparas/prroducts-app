import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Layout from '../components/layout';

export default props => {
  const products = props.data.allDemoProducts.edges;
  const { tag } = props.pageContext;
  console.log(props);
  return (
    <Layout>
      <Typography gutterBottom variant="h6" component="h3">
        Collection {tag}
      </Typography>
      <Grid container spacing={8}>
        {products.map(({ node }, i) => (
          <Grid key={node.id} item md={3} style={{ display: 'flex' }}>
            <Card elevation={0}>
              <CardContent>
                <Img fixed={node.localImage.childImageSharp.fixed} />
                <Typography>{node.title}</Typography>
              </CardContent>
              <CardActions>
                <Typography>{node.price}</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query($tag: String!) {
    allDemoProducts(limit: 2000, filter: { collection: { eq: $tag } }) {
      edges {
        node {
          id
          title
          price
          localImage {
            childImageSharp {
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
