import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Typography from '../components/typography';

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0%',
  },
  cardContent: {
    flex: '1 1 auto',
  },
};

class Category extends Component {
  state = {
    productsToShow: 12,
  };
  render() {
    const { data, pageContext, classes, location } = this.props;
    const { productsToShow } = this.state;
    const { category } = pageContext;
    let products = data.allDemoProducts.edges;
    return (
      <Layout location={location}>
        <SEO title={category} keywords={[`gatsby`, `application`, `react`]} />
        <Typography variant="h3" component="h1">
          <b>{category}</b>
        </Typography>
        <Grid container spacing={8}>
          {products.slice(0, productsToShow).map(({ node }) => (
            <Grid
              key={node.id}
              item
              md={3}
              sm={6}
              xs={12}
              style={{ display: 'flex' }}
            >
              <Card className={classes.card} elevation={0}>
                <CardActionArea
                  component={Link}
                  to={`/${node.id}/`}
                  state={{
                    modal: true,
                    modalBackgroundPath: node.category,
                  }}
                >
                  <CardContent>
                    <Img fixed={node.localImage.childImageSharp.fixed} />
                    <Typography>{node.title}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>{node.price}</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {productsToShow < products.length && (
          <Button
            tag="button"
            onClick={() => {
              this.setState({
                productsToShow: productsToShow + 12,
              });
            }}
          >
            Load More
          </Button>
        )}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allDemoProducts(limit: 1000, filter: { category: { eq: $category } }) {
      totalCount
      edges {
        node {
          id
          title
          price
          category
          localImage {
            childImageSharp {
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(Category);
