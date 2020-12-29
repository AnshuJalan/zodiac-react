import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" style={{color:"black"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img width="96" alt="brand" src={process.env.PUBLIC_URL + "/images/brand.svg"} />
          </Typography>
          <Button className={classes.menuButton} color="inherit">Trade</Button>
          <Button className={classes.menuButton} color="inherit">GitHub</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

