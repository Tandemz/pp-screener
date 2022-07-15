import React, { ChangeEvent, useCallback } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Field } from '../../queries/field';
import { Theme } from '../../theme';
import { Input } from '../Input';
import { FieldContainer } from './FieldContainer';

const useStyles = createUseStyles((theme: Theme) => ({}));

interface Props {
  field: Field;
  onChange: (field: Field) => void;
  onRemove: (field: Field) => void;
}

export const FieldBuilder = ({ field, onRemove, onChange }: Props) => {
  const theme: Theme = useTheme();
  const classes = useStyles({ theme });

  const onLabelChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...field,
        label: e.target.value,
      });
    },
    [field, onChange],
  );

  return (
    <FieldContainer onRemove={onRemove} field={field}>
      <Input
        label="Question Label"
        value={field.label}
        onChange={onLabelChange}
      />
    </FieldContainer>
  );
};
