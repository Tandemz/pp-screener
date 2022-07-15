import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import { useTheme, createUseStyles } from 'react-jss';
import { Theme } from '../theme/theme';

interface OptionType {
  label: string;
  value: string;
}

interface Props {
  className?: string;
  label?: string | React.ReactNode;
  containerClass?: string;
  options: OptionType[];
  onChange?: (value: string) => void;
  value?: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: 'flex',
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
    ...theme.fonts.label,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.grayBorder,
    borderRadius: theme.borderRadius.std,
    paddingRight: theme.marginBase,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: theme.marginBase,
    minHeight: theme.height.small,
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

export const Select = ({
  label,
  containerClass,
  className,
  disabled,
  onChange,
  options,
  ...rest
}: Props & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const theme: Theme = useTheme();
  const classes = useStyles({ theme });

  const _onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };
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
        <select
          className={classnames(className, classes.input)}
          {...rest}
          disabled={disabled}
          onChange={_onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
