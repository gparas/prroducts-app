import letterSpacings from './letter-spacings';
import lineHeights from './line-heights';

const defaultFontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Roboto Light", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol"`;

const pxToRem = size => `${size / 16}rem`;
export const buildVariant = (
  fontFamily,
  fontWeight,
  size,
  lineHeight,
  letterSpacing,
  textTransform
) => ({
  fontFamily: fontFamily,
  fontSize: pxToRem(size),
  fontWeight: fontWeight,
  lineHeight: lineHeight,
  letterSpacing: letterSpacing,
  textTransform: textTransform,
});

export const fontWeight = {
  extraBold: 800,
  bold: 700,
  Medium: 600,
  Regular: 400,
  Light: 300,
};

export const caseAllCaps = {
  textTransform: 'uppercase',
};

export const typography = {
  h1: buildVariant(
    defaultFontFamily,
    fontWeight.Light,
    96,
    lineHeights.dense,
    letterSpacings.tight
  ),
  h2: buildVariant(
    defaultFontFamily,
    fontWeight.Light,
    60,
    lineHeights.dense,
    letterSpacings.tight
  ),
  h3: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    48,
    lineHeights.dense,
    letterSpacings.normal
  ),
  h4: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    34,
    lineHeights.dense,
    letterSpacings.normal
  ),
  h5: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    24,
    lineHeights.dense,
    letterSpacings.normal
  ),
  h6: buildVariant(
    defaultFontFamily,
    fontWeight.Medium,
    20,
    lineHeights.dense,
    letterSpacings.normal
  ),
  subtitle1: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    16,
    lineHeights.loose,
    letterSpacings.normal
  ),
  subtitle2: buildVariant(
    defaultFontFamily,
    fontWeight.Medium,
    14,
    lineHeights.default,
    letterSpacings.normal
  ),
  body1: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    16,
    lineHeights.default,
    letterSpacings.normal
  ),
  body2: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    14,
    lineHeights.default,
    letterSpacings.normal
  ),
  button: buildVariant(
    defaultFontFamily,
    fontWeight.Medium,
    14,
    lineHeights.loose,
    letterSpacings.normal,
    caseAllCaps
  ),
  caption: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    12,
    lineHeights.default,
    letterSpacings.normal
  ),
  overline: buildVariant(
    defaultFontFamily,
    fontWeight.Regular,
    12,
    lineHeights.loose,
    letterSpacings.tracked,
    caseAllCaps
  ),
};

export default typography;
