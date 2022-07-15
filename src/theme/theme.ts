import Color from 'color';
import { mapValues } from 'lodash';

const tabletSize = 1024;
const mobileSize = 600;

const colors = {
  inkPrimary: Color('#192948'),
  inkSecondary: Color('#536383'),
  inkTertiary: Color('#9AA8BD'),

  greenAccessible: Color('#008946'),
  green: Color('#00BD66'),
  greenMuted: Color('#E7FFE8'),

  blueAccessible: Color('#1C75DF'),
  blue: Color('#1493FF'),
  blueMuted: Color('#E3F4FF'),

  yellow: Color('#FFD938'),
  yellowMuted: Color('#FFFAC4'),
  yellowAccessible: Color('#E26F1D'),

  redAccessible: Color('#DC3A16'),
  red: Color('#FF5533'),
  redMuted: Color('#FFE4D8'),

  purpleAccessible: Color('#7525DC'),
  purple: Color('#8D4FF8'),
  purpleMuted: Color('#E8D0FF'),

  grayBorder: Color('#DBE0E5'),
  grayBackground: Color('#F7F9FB'),
  white: Color('#FFFFFF'),
};

export type ColorDef = {
  muted: Color;
  std: Color;
  accessible: Color;
  hoverAccessible: Color;
};
export type Colors =
  | 'green'
  | 'blue'
  | 'purple'
  | 'yellow'
  | 'red'
  | 'inkSecondary'
  | 'ink';
const byColors: { [color in Colors]: ColorDef } = {
  green: {
    muted: colors.greenMuted,
    std: colors.green,
    accessible: colors.greenAccessible,
    hoverAccessible: colors.white,
  },
  blue: {
    muted: colors.blueMuted,
    std: colors.blue,
    accessible: colors.blueAccessible,
    hoverAccessible: colors.white,
  },
  purple: {
    muted: colors.purpleMuted,
    std: colors.purple,
    accessible: colors.purpleAccessible,
    hoverAccessible: colors.white,
  },
  yellow: {
    muted: colors.yellowMuted,
    std: colors.yellow,
    accessible: colors.yellowAccessible,
    hoverAccessible: colors.white,
  },
  red: {
    muted: colors.redMuted,
    std: colors.red,
    accessible: colors.redAccessible,
    hoverAccessible: colors.white,
  },
  ink: {
    muted: colors.grayBackground,
    std: colors.inkSecondary,
    accessible: colors.inkPrimary,
    hoverAccessible: colors.white,
  },
  inkSecondary: {
    muted: colors.grayBackground,
    std: colors.inkSecondary,
    accessible: colors.inkSecondary,
    hoverAccessible: colors.white,
  },
};

const getHoverColors = (color: Color) => ({
  '&:hover:not(:disabled)': {
    backgroundColor: color.darken(0.05).hex(),
  },
  '&:active:not(:disabled)': {
    backgroundColor: color.darken(0.2).hex(),
  },
  '&:focus:not(:disabled)': {
    backgroundColor: color.lighten(0.1).hex(),
  },
});

export const theme = {
  basicColors: colors,
  basicColorsDefinition: byColors,
  colorList: Object.keys(byColors) as Array<Colors>,

  colors: mapValues(colors, (color: Color) => color.hex()),
  hoverColors: mapValues(colors, (color: Color) => color.darken(0.05).hex()),
  disabledColors: mapValues(colors, (color: Color) => color.fade(0.5).hex()),

  colorDefinitions: mapValues(byColors, (colorDef: ColorDef) => ({
    muted: colorDef.muted.hex(),
    std: colorDef.std.hex(),
    accessible: colorDef.accessible.hex(),
    hoverAccessible: colorDef.hoverAccessible.hex(),
  })),
  mutedColorCombinations: mapValues(byColors, (colorDef: ColorDef) => ({
    backgroundColor: colorDef.muted.hex(),
    color: colorDef.accessible.hex(),
  })),
  mutedColorsHover: mapValues(byColors, (colorDef: ColorDef) => ({
    '&:hover:not(:disabled)': {
      backgroundColor: colorDef.muted.desaturate(0.3).darken(0.03).hex(),
    },
    '&:active:not(:disabled)': {
      backgroundColor: colorDef.muted.darken(0.05).desaturate(0.4).hex(),
    },
    '&:focus:not(:disabled)': {
      backgroundColor: colorDef.muted.desaturate(0.3).darken(0.03).hex(),
    },
  })),
  plainColorCombinaisons: mapValues(byColors, (colorDef: ColorDef) => ({
    backgroundColor: colorDef.accessible.hex(),
    color: colorDef.hoverAccessible.hex(),
  })),
  plainColorsHover: mapValues(byColors, (colorDef: ColorDef) =>
    getHoverColors(colorDef.accessible),
  ),
  lightBgHover: {
    white: {
      backgroundColor: colors.white.hex(),
      '&:hover:not(:disabled)': {
        backgroundColor: colors.grayBackground.hex(),
      },
      '&:active:not(:disabled)': {
        backgroundColor: colors.grayBackground.darken(0.05).hex(),
      },
      '&:focus:not(:disabled)': {
        backgroundColor: colors.grayBackground.hex(),
      },
    },
    gray: {
      backgroundColor: colors.grayBackground.hex(),
      ...getHoverColors(colors.grayBackground),
    },
  },

  marginBase: 8,

  maxContentWidth: {
    regular: 560,
    largeForm: 720,

    screen: 880, // theme.marginBase * 110,
    largeModale: 928, // theme.marginBase * 116,
    largeReduced: 624, // theme.marginBase * 76 - For modal, panel, ...
    reduced: 480, // theme.marginBase * 60 - For modal, panel, ...
    reducedFormContent: 400, // theme.marginBase * 60 - For modal, panel, ...
    smallBlock: 240, // theme.marginBase * 30,
    mediumBlock: 320, // theme.marginBase * 40,
  },
  borderRadius: {
    std: 4,
  },
  height: {
    chips: 24, // theme.marginBase * 3,
    tiny: 32, // theme.marginBase * 4
    small: 40, // theme.marginBase * 5
    regular: 48, // theme.marginBase * 6
    large: 56, // theme.marginBase * 7
  },
  iconSize: {
    small: 16,
    regular: 20,
    large: 24,
    huge: 40,
  },
  fonts: {
    h1: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 900,
      fontSize: 44,
      lineHeight: '125%',
    },
    h2: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 900,
      fontSize: 35,
      lineHeight: '125%',
    },
    h3: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 900,
      fontSize: 28,
      lineHeight: '125%',
    },
    h4: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '125%',
    },
    h5: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '125%',
    },
    body: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '175%',
    },
    caption: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
    },
    label: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '150%',
    },
    calendarText: {
      fontFamily: 'Muli, Helvetica, Arial, sans-serif',
      color: colors.inkPrimary.hex(),
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '150%',
    },
  },
  breackPoints: {
    tablet: tabletSize,
    mobile: mobileSize,
  },
  mediaContent: {
    mobile: `(max-width: ${mobileSize - 1}px)`,
    tablet: `(max-width: ${tabletSize - 1}px)`,
    desktop: `(min-width: ${tabletSize}px)`,
  },
  media: {
    mobile: `@media (max-width: ${mobileSize - 1}px)`,
    tablet: `@media (max-width: ${tabletSize - 1}px)`,
    desktop: `@media (min-width: ${tabletSize}px)`,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boxShadow: {
    base: '0px 4px 15px rgba(25, 41, 72, 0.15)',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactDates: {},
};

export type Theme = typeof theme;
