import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" color="transparent">
        <div style={{ width: "80%", margin: "auto" }}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              <img
                width="124"
                alt="brand"
                src={process.env.PUBLIC_URL + "/images/brand.svg"}
              />
            </Typography>
            <Link style={{ textDecoration: "none" }} to="/markets/open">
              <Button>Trade</Button>
            </Link>
            <Button
              onClick={() =>
                window.open(
                  "https://github.com/AnshuJalan/zodiac-react",
                  "_blank"
                )
              }
            >
              GitHub
            </Button>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}
