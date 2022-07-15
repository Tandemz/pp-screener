import React, { SyntheticEvent, useCallback, useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Theme } from '../theme';
import { useFields, Field } from '../queries/field';
import { Button, FieldBuilder } from '../components';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    maxWidth: 560 + theme.marginBase * 20,
    padding: theme.marginBase * 10,
    flex: 1,
    overflow: 'auto',
    width: '100%',
  },
  footer: {
    width: '100%',
    height: theme.marginBase * 10,
    boxShadow: theme.boxShadow.base,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.marginBase * 4,
    paddingRight: theme.marginBase * 4,
  },
  addButton: {
    ...theme.fonts.label,
    display: 'block',
    backgroundColor: theme.colors.grayBackground,
    height: theme.height.regular,
    paddingLeft: theme.marginBase * 2,
    paddingRight: theme.marginBase * 2,
    textAlign: 'left',
  },
}));

const getDefaultField = (): Field => ({
  id: Math.floor(Math.random() * 100000),
  label: '',
});

export const Screener = () => {
  const theme: Theme = useTheme();
  const classes = useStyles({ theme });

  const initialState = useFields();
  const [fields, setFields] = useState(initialState);

  const submit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      console.log(fields);
    },
    [fields],
  );
  const onChange = useCallback(
    (field: Field) => {
      setFields((fields) => fields.map((f) => (f.id === field.id ? field : f)));
    },
    [setFields],
  );
  const onRemove = useCallback(
    (field: Field) => {
      setFields((fields) => fields.filter((f) => f.id !== field.id));
    },
    [setFields],
  );
  const onAdd = useCallback(() => {
    setFields((fields) => [...fields, getDefaultField()]);
  }, [setFields]);

  return (
    <form className={classes.page} onSubmit={submit}>
      <div className={classes.content}>
        {fields.map((field, index) => (
          <FieldBuilder
            field={field}
            key={field.id}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
        <button type="button" className={classes.addButton} onClick={onAdd}>
          Add a question
        </button>
      </div>
      <div className={classes.footer}>
        <Button type="submit" small>
          Save
        </Button>
      </div>
    </form>
  );
};
