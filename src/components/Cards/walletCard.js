import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
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
    fontSize: 15,
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
          <Typography className={classes.title} color="initial" gutterBottom>
            <Key /> : {wallet.accountPkh}
          </Typography>
          <Typography className={classes.title} color="initial" gutterBottom>
            <AccountBalanceIcon /> : {wallet.accountBalance.toNumber()}
          </Typography>
        </CardContent>
        <Divider light />
        <CardActions>
          <Button
            style={{ margin: "auto" }}
            size="small"
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
