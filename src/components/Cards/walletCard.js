import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Key from "@material-ui/icons/VpnKey";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ wallet, connect }) {
  const classes = useStyles();

  return (
    <div className="column-flex">
      <Card className={classes.root}>
        <CardContent>
          <Typography
            style={{ marginBottom: 15 }}
            className={classes.title}
            color="initial"
            gutterBottom
          >
            <Key style={{ marginRight: 10, fontSize: 30 }} />{" "}
            {wallet.accountPkh}
          </Typography>
          <Typography className={classes.title} color="initial" gutterBottom>
            <img
              alt="icon"
              src={process.env.PUBLIC_URL + "/images/tz-icon.png"}
              width="30"
              style={{ marginRight: 10 }}
            />{" "}
            {wallet.accountBalance.toNumber() / 1000000}
          </Typography>
        </CardContent>
        <Divider light />
        <CardActions>
          <Button
            style={{ margin: "5px auto" }}
            fullWidth
            variant="outlined"
            color="primary"
            onClick={connect}
          >
            Switch Account
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
