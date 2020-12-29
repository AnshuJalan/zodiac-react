import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import IPFS from "nano-ipfs-store";
import { loadMainContract } from "../actions";
// import BasicDateTimePicker from "./layout/DateTimePicker";
import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

const ipfs = IPFS.at("https://ipfs.infura.io:5001");

const MarketCreate = ({
  main,
  isWalletConnected,
  loadMainContract,
  history,
}) => {
  useEffect(() => {
    if (isWalletConnected && !main) loadMainContract();
  }, [isWalletConnected, main, loadMainContract]);

  const [title, setTitle] = useState("");
  const [resolution, setResolution] = useState("");
  const [additional, setAdditional] = useState("");
  const [dateTime, handleClearedDateChange] = useState(null);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorDateTime, setErrorDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validate()) return;

    const data = {
      title,
      resolution,
      additional,
    };

    setLoading(true);
    try {
      const hash = await ipfs.add(JSON.stringify(data));
      await createMarket({
        endTime: new Date(dateTime) / 1000,
        ipfsString: hash,
      });
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const createMarket = async ({ endTime, ipfsString }) => {
    const operation = await main.methods
      .createMarket(endTime, ipfsString)
      .send({});
    await operation.confirmation();
    history.push("/markets/account");
  };

  const validate = () => {
    if (!title) setErrorTitle("Title field must not be empty!");
    else setErrorTitle("");

    if (!resolution) setErrorLink("Resolution field must not be empty!");
    else setErrorLink("");

    if (!title || !resolution) return false;

    if (!dateTime) {
      setErrorDateTime("Date must be entered!");
      return false;
    }

    if (dateTime < Date.now()) {
      setErrorDateTime("Date must not be in the past!");
      return false;
    }

    if (!validateUrl(resolution)) {
      setErrorLink("Resolution must be a valid HTTP link!");
      return false;
    }
    return true;
  };

  if (!isWalletConnected) {
    return (
      <div className="column-flex">
        Thanos Wallet is not connected. Please go to wallet settings and connect
        Thanos.
      </div>
    );
  } else if (!main) {
    return (
      <div className="column-flex">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className="column-flex">
      <div style={formBackgroundStyle}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={errorTitle !== ""}
              variant="outlined"
              helperText={errorTitle}
              fullWidth
              label="Title / Question"
              required
              value={title}
              // InputLabelProps={{ shrink: true }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{width:"60vw"}}
              error={errorLink !== ""}
              helperText={errorLink}
              variant="outlined"
              label="Resolution Source (Website Link)"
              required
              fullWidth
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              // InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils} >
              <DateTimePicker
                error={errorDateTime !== ""}
                style={{width: "23vw"}}
                label="Next Appointment"
                inputVariant="outlined"
                disablePast
                clearable
                value={dateTime}
                onChange={handleClearedDateChange}
                showTodayButton
                required
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item sm={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Additional Details (Optional)"
              multiline
              rows={10}
              value={additional}
              onChange={(e) => setAdditional(e.target.value)}
              // InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={onSubmit}
              variant="outlined"
              color="primary"
              size="large"
            >
              {loading ? (
                <>
                  <CircularProgress size={18} color="primary" />
                  <span style={{ marginLeft: "5px" }}>
                    Confirming Transaction
                  </span>
                </>
              ) : (
                "Create Market"
              )}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const formBackgroundStyle = {
  width: "calc(100% - 48px)",
  padding: "26px",
  margin: "0px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0px 1px 7px -2px #828282",
};

const mapStateToProps = (state) => {
  return {
    main: state.contracts.main,
    isWalletConnected: state.wallet.connected,
  };
};

export default connect(mapStateToProps, { loadMainContract })(MarketCreate);
