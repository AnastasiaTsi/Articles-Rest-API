import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EditButton = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Button
      size="small"
        variant="outlined"
        color="primary"
        className={classes.button}
      >
        {props.message}
      </Button>
    </div>
  );
}
export default EditButton;