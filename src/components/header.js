import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const Header = ({ siteTitle }) => (
  <AppBar position="static" color="default" elevation={0}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        <MuiLink component={Link} to="/">
          {siteTitle}
        </MuiLink>
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
