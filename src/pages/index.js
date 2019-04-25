import React from 'react';
import { Link, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = props => {
  const data = props.data.allDemoProducts.group;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Typography variant="h2" component="h1">
        Hi people
      </Typography>
      <Grid container spacing={24}>
        {data.map(tag => (
          <Grid key={tag.fieldValue} item md={4}>
            <Card>
              <CardActionArea component={Link} to={`/${tag.fieldValue}`}>
                <CardContent>
                  <Typography>
                    {tag.fieldValue} {`(${tag.totalCount})`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allDemoProducts(limit: 2000) {
      group(field: collection) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default IndexPage;
