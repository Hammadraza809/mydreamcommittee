import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        href="\register"
        style={{
          backgroundColor: "rgb(252, 143, 0)",
          color: "white",
          padding: "10px 15px"
        }}
        variant="contained">
        Register
      </Button>
    </div>
  );
}
