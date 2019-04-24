import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SEO from '../components/seo';

if (typeof window !== `undefined`) {
  window.postsToShow = 24;
}

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
    let { allDemoProducts } = this.props.data;
    const products = allDemoProducts.edges.map(e => e.node);
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        {chunk(products.slice(0, this.state.postsToShow), 4).map((chunk, i) => (
          <Grid container spacing={16} key={`chunk-${i}`}>
            {chunk.map(node => {
              return (
                <Grid key={node.id} item md={3}>
                  <Card>
                    <CardContent>
                      <Img fixed={node.localImage.childImageSharp.fixed} />
                      <Typography align="center">{node.title}</Typography>
                      <Typography align="center">{node.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
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

export default IndexPage;
