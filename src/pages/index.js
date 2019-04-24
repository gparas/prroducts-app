import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Grid container spacing={16}>
        {data.products.edges.map(({ node: product }) => (
          <Grid key={product.id} item md={4}>
            <Card>
              <CardContent>
                <Img fixed={product.localImage.childImageSharp.fixed} />
                <Typography align="center">{product.title}</Typography>
                <Typography align="center">{product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export const query = graphql`
  query CatalogueQuery {
    products: allDemoProducts(limit: 10) {
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

export default IndexPage;
