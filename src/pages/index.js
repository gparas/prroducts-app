import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SEO from '../components/seo';
import Layout from '../components/layout';

if (typeof window !== `undefined`) {
  window.postsToShow = 24;
}

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

class IndexPage extends Component {
  constructor() {
    super();
    let postsToShow = 24;
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow;
    }

    this.state = {
      showingMore: postsToShow > 24,
      postsToShow,
    };
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 24 });
    }
    this.ticking = false;
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
    window.postsToShow = this.state.postsToShow;
  }

  render() {
    const { classes } = this.props;
    let { allDemoProducts } = this.props.data;
    const products = allDemoProducts.edges.map(e => e.node);
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Typography variant="h3" component="h1">
          <b>Daily inspiration, right in your face</b>
        </Typography>
        {chunk(products.slice(0, this.state.postsToShow), 4).map((chunk, i) => (
          <div key={`chunk-${i}`} style={{ padding: 4 }}>
            <Grid container spacing={8}>
              {chunk.map(node => {
                return (
                  <Grid key={node.id} item md={3} style={{ display: 'flex' }}>
                    <Card className={classes.card} elevation={0}>
                      <CardActionArea
                        component={Link}
                        className={classes.cardContent}
                        to={`/${node.id}`}
                        state={{ showModal: true }}
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
                );
              })}
            </Grid>
          </div>
        ))}
        {!this.state.showingMore && (
          <Button
            onClick={() => {
              this.setState({
                postsToShow: this.state.postsToShow + 24,
                showingMore: true,
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
  query {
    allDemoProducts {
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

export default withStyles(styles)(IndexPage);
