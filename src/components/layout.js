import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { navigate, PageRenderer } from 'gatsby';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';

import Header from './header';

class Layout extends Component {
  handleCloseModal = () => {
    navigate(this.props.modalBackgroundPath);
  };
  render() {
    const { children, modalBackgroundPath, isModal } = this.props;
    if (isModal) {
      return (
        <Fragment>
          <PageRenderer location={{ pathname: modalBackgroundPath }} />
          <Dialog open onClose={this.handleCloseModal}>
            {children}
          </Dialog>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <CssBaseline />
        <Header siteTitle="Demo" />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>© {new Date().getFullYear()}</footer>
        </div>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  isModal: false,
};

export default Layout;
