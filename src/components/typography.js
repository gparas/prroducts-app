import React from 'react';
import PropTypes from 'prop-types';
import { typography } from '../utils/tokens';

const styles = {
  root: {
    margin: 0,
  },
  body2: typography.body2,
  body1: typography.body1,
  caption: typography.caption,
  button: typography.button,
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  h4: typography.h4,
  h5: typography.h5,
  h6: typography.h6,
  subtitle1: typography.subtitle1,
  subtitle2: typography.subtitle2,
  overline: typography.overline,
};

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
};

const Typography = props => {
  const { variant, component, paragraph, ...other } = props;
  const Component =
    component || (paragraph ? 'p' : defaultVariantMapping[variant]) || 'span';
  return (
    <Component
      css={{
        ...styles.root,
        ...styles[variant],
      }}
      {...other}
    />
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
    'srOnly',
    'inherit',
  ]),
};

Typography.defaultProps = {
  variant: 'body1',
};

export default Typography;
