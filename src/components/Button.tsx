import * as React from 'react';
import classnames from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { Theme, Colors } from '../theme/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  button: {
    ...theme.fonts.label,
    position: 'relative',
    minWidth: 100,
    minHeight: theme.height.regular,
    borderRadius: theme.borderRadius.std,
    '&:disabled, &[disabled]': {
      opacity: 0.5,
      cursor: 'default',
    },

    display: 'inline-flex',
    alignItems: 'stretch',
    padding: 0,
  },
  buttonContent: {
    flex: 1,
    paddingRight: theme.marginBase * 3,
    paddingLeft: theme.marginBase * 3,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonContent: {
    paddingRight: theme.marginBase * 2,
    paddingLeft: theme.marginBase * 2,
  },
  contentLoading: {
    opacity: 0,
  },
  spinnerContainer: {
    ...theme.absoluteFill,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    minHeight: theme.height.small,
  },
  backIcon: {
    fontSize: theme.iconSize.regular,
    marginRight: theme.marginBase,
  },
  nextIcon: {
    fontSize: theme.iconSize.regular,
    marginLeft: theme.marginBase,
  },
}));

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

const useMuttedColorStyle = createUseStyles((theme: Theme) =>
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

const useWhiteBgStyle = createUseStyles((theme: Theme) => ({
  whiteBg: {
    ...theme.lightBgHover.white,
  },
}));

export type ButtonVariant = 'plain' | 'transparent' | 'muted';
export interface SpecialProps {
  color?: Colors;
  variant?: ButtonVariant;
  overGray?: boolean;
  withNextArrow?: boolean;
  withBackArrow?: boolean;
  small?: boolean;
  trackEvent?: string;
  trackCategory?: string;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
  textValues?: any;
  rightInsert?: React.ReactNode;
  contentClassName?: string;
}

type Props = SpecialProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = Props;

export const Button = ({
  className,
  children,
  color = 'blue',
  withNextArrow,
  withBackArrow,
  small,
  trackEvent,
  trackCategory,
  isLoading,
  text,
  textValues,
  variant = 'plain',
  overGray,
  rightInsert,
  contentClassName,
  ...props
}: Props) => {
  const theme: Theme = useTheme();
  const classes = useStyles({ theme });
  const plainClasses = usePlainColorStyle({ theme });
  const transparentClasses = useTransparentColorStyle({ theme });
  const mutedClasses = useMuttedColorStyle({ theme });
  const whiteBgClasses = useWhiteBgStyle({ theme });
  const byVariantClasses: any = {
    plain: plainClasses,
    transparent: transparentClasses,
    muted: mutedClasses,
  };

  return (
    <button
      type="button"
      {...props}
      className={classnames(
        className,
        classes.button,
        byVariantClasses[variant][color],
        {
          [whiteBgClasses.whiteBg]:
            variant === 'muted' && color.startsWith('ink') && !!overGray,
          [classes.smallButton]: !!small,
        },
      )}
    >
      <React.Fragment>
        <div
          className={classnames(classes.buttonContent, contentClassName, {
            [classes.smallButtonContent]: !!small,
            [classes.contentLoading]: !!isLoading,
          })}
        >
          {!!withBackArrow && (
            <i className={classnames('ri-arrow-left-line', classes.backIcon)} />
          )}
          {children}
          {text}
          {!!withNextArrow && (
            <i
              className={classnames('ri-arrow-right-line', classes.nextIcon)}
            />
          )}
        </div>
        {rightInsert}
      </React.Fragment>
    </button>
  );
};
