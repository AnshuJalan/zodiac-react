import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "18vw",
    marginTop: "0.5vh",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  market: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "light",
  },
}));

const AccountCard = (props) => {
  const [hovering, setHovering] = useState(false);
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const { result, endTime } = props.market;

  const classes = useStyles();

  const declareResult = async () => {
    if (position !== 0 && position !== 1) {
      alert("Please enter a valid result position");
      return;
    }
    try {
      setLoading(true);
      const operation = await props.market.instance.methods
        .setResult(position)
        .send();
      await operation.confirmation();
      await props.loadMarketsAccount();

      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const resultForm = (
    <>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
      >
        <InputLabel id="demo-simple-select-outlined-label">Result</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        >
          <MenuItem value={0}>Long</MenuItem>
          <MenuItem value={1}>Short</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={() => declareResult()}
        variant="outlined"
        color="primary"
        size="small"
        style={{ minWidth: "18vw" }}
      >
        {loading ? (
          <>
            <CircularProgress style={{ marginRight: "10px" }} size={12} />
            CONFIRMING
          </>
        ) : (
          "SET RESULT"
        )}
      </Button>
    </>
  );

  const getSecondGrid = () => {
    if (Date.now() >= endTime)
      return result === null ? (
        resultForm
      ) : (
        <p>
          Result Declared:{" "}
          <span
            style={{
              fontWeight: "bold",
              color: result.toNumber() === 0 ? "#4caf50" : "#f44336",
            }}
          >
            {result.toNumber() === 0 ? "LONG" : "SHORT"}
          </span>
        </p>
      );
    else return <p>END TIME: {endTime.toLocaleString()}</p>;
  };

  return (
    <Card
      raised={hovering}
      onMouseOver={() => {
        setHovering(true);
      }}
      onMouseOut={() => {
        setHovering(false);
      }}
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography className={classes.title}>
              {props.market.title}
            </Typography>
            <Typography className={classes.market} color="textSecondary">
              {props.market.address}
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            item
            xs={4}
          >
            {getSecondGrid()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
