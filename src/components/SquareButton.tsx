import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import classnames from 'classnames';
import { Theme, Colors } from '../theme/theme';

const useMutedColorStyle = createUseStyles((theme: Theme) =>
  theme.colorList.reduce((acc, color) => {
    return {
      ...acc,
      [color]: {
        ...theme.mutedColorCombinations[color],
        ...theme.mutedColorsHover[color],
      },
    };
  }, {}),
);

const usePlainColorStyle = createUseStyles((theme: Theme) =>
  theme.colorList.reduce((acc, color) => {
    return {
      ...acc,
      [color]: {
        ...theme.plainColorCombinaisons[color],
        ...theme.plainColorsHover[color],
      },
    };
  }, {}),
);

const useTransparentColorStyle = createUseStyles((theme: Theme) =>
  theme.colorList.reduce((acc, color) => {
    return {
      ...acc,
      [color]: {
        ...theme.lightBgHover.white,
        backgroundColor: 'transparent',
        color: theme.colorDefinitions[color].accessible,
      },
    };
  }, {}),
);

const useStyles = createUseStyles((theme: Theme) => ({
  button: {
    width: theme.height.small,
    minWidth: theme.height.small,
    height: theme.height.small,
    borderRadius: theme.borderRadius.std,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:disabled, &[disabled]': {
      opacity: 0.5,
      cursor: 'default',
    },
  },
  icon: {
    fontSize: theme.iconSize.large,
  },
  whiteBg: {
    ...theme.lightBgHover.white,
  },
}));

export type Variant = 'muted' | 'plain' | 'transparent';

interface SpecialProps {
  color: Colors;
  variant?: Variant;
  overGray?: boolean;
  className?: string;
  icon: string;
}

type Props = SpecialProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type SquareButtonProps = Props;

export const SquareButton = (props: Props) => {
  const {
    icon,
    color,
    className,
    variant = 'muted',
    overGray,
    ...extra
  } = props;
  const theme: Theme = useTheme();

  const classes: any = useStyles({ theme });

  const plainClasses: any = usePlainColorStyle({ theme });
  const mutedClasses: any = useMutedColorStyle({ theme });
  const transparentClasses: any = useTransparentColorStyle({ theme });

  const classesMap = {
    plain: plainClasses,
    muted: mutedClasses,
    transparent: transparentClasses,
  };
  return (
    <button
      type="button"
      {...extra}
      className={classnames(
        classes.button,
        classesMap[variant][color],
        {
          [classes.whiteBg]:
            variant === 'muted' && color.startsWith('ink') && !!overGray,
        },
        className,
      )}
    >
      <i className={classnames(icon, classes.icon)} />
    </button>
  );
};
