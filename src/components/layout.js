import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { PageRenderer } from 'gatsby';
import { Global } from '@emotion/core';
import { typography, colors } from '../utils/tokens';

import Modal from './modal';
import Header from './header';

const globalStyles = {
  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    boxSizing: 'border-box',
  },
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  body: {
    margin: 0,
    color: colors.text.primary,
    ...typography.body2,
    backgroundColor: colors.background.default,
  },
};

class Layout extends Component {
  render() {
    const { children, modalBackgroundPath, isModal, location } = this.props;
    if (isModal) {
      return (
        <Fragment>
          <PageRenderer location={{ pathname: modalBackgroundPath }} />
          <Modal location={location} modalBackgroundPath={modalBackgroundPath}>
            {children}
          </Modal>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Global styles={globalStyles} />
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
