import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  market: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "light",
  },
  action: {
    marginLeft: 7,
    marginBottom: 5,
  },
});

const MarketCard = (props) => {
  const [hovering, setHovering] = useState(false);

  const { address, title } = props.market;

  const classes = useStyles();

  return (
    <Card
      raised={hovering}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.market} color="textSecondary">
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() =>
            props.history.push({
              pathname: "/market/show",
              address,
            })
          }
          className={classes.action}
          variant="outlined"
          color="primary"
        >
          TRADE
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    tezos: state.wallet.tezos,
  };
};

export default connect(mapStateToProps)(MarketCard);
