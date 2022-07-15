import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Field } from '../../queries/field';
import { Theme } from '../../theme';
import { SquareButton } from '../SquareButton';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.colors.grayBackground,
    padding: theme.marginBase * 2,
    marginBottom: theme.marginBase * 2,
  },
  deleteButton: {
    position: 'absolute',
    right: -theme.marginBase - 40,
    top: 0,
  },
}));

interface Props {
  field: Field;
  onRemove: (field: Field) => void;
  children: React.ReactNode;
}

export const FieldContainer = ({ field, onRemove, children }: Props) => {
  const theme: Theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.container}>
      <div className={classes.deleteButton}>
        <SquareButton
          onClick={() => onRemove(field)}
          color="red"
          icon="ri-delete-bin-line"
        />
      </div>
      {children}
    </div>
  );
};
