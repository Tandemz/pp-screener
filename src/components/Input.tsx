import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { useTheme, createUseStyles } from 'react-jss';
import { Theme } from '../theme/theme';

interface Props {
  className?: string;
  label?: string | React.ReactNode;
  containerClass?: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  disabledContainer: {
    opacity: 0.5,
    '& > label': {
      cursor: 'auto',
    },
  },
  inputContainer: {
    position: 'relative',
    flexGrow: 1,
  },
  input: {
    ...theme.fonts.caption,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.grayBorder,
    borderRadius: theme.borderRadius.std,
    padding: `${theme.marginBase / 2}px ${theme.marginBase * 2}px`,
    minHeight: theme.height.small,
    width: '100%',
    transition: 'border-color 0.3s',
    boxShadow: 'none',

    '&:hover + div, &:focus + div, &:active + div': {
      opacity: 1,
      cursor: 'pointer',
    },

    '&::placeholder': {
      color: theme.colors.inkTertiary,
      opacity: 0.6,
    },
    '&:focus': {
      borderColor: theme.colors.blue,
    },
    '&:invalid:not(:focus):not(:placeholder-shown)': {
      borderColor: theme.colors.red,
    },
    [theme.media.mobile]: {
      //disable zoom for iPhone users
      fontSize: 16,
    },
  },
  labelContainer: {
    display: 'flex',
    marginBottom: theme.marginBase / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...theme.fonts.label,
  },
}));

export const Input = ({
  label,
  containerClass,
  className,
  disabled,
  ...rest
}: Props & HTMLProps<HTMLInputElement>) => {
  const theme: Theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div
      className={classnames(containerClass, classes.container, {
        [classes.disabledContainer]: !!disabled,
      })}
    >
      {label && (
        <div className={classes.labelContainer}>
          <label className={classes.label}>{label}</label>
        </div>
      )}
      <div className={classes.inputContainer}>
        <input
          className={classnames(className, classes.input)}
          {...rest}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
