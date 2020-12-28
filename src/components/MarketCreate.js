import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

const MarketCreate = () => {
  const [title, setTitle] = useState();
  const [resolution, setResolution] = useState();
  const [additional, setAdditional] = useState();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorLink, setErrorLink] = useState("");

  const onSubmit = () => {
    if (!validate()) return;
  };

  const validate = () => {
    if (!title) setErrorTitle("Title field must not be empty!");
    else setErrorTitle("");

    if (!resolution) setErrorLink("Resolution field must not be empty!");
    else setErrorLink("");

    if (!title || !resolution) return false;

    if (!validateUrl(resolution)) {
      setErrorLink("Resolution must be a valid HTTP link!");
      return false;
    }
    return true;
  };

  return (
    <div className="column-flex">
      <div style={formBackgroundStyle}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              error={errorTitle}
              variant="outlined"
              helperText={errorTitle}
              fullWidth
              label="Title / Question"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              error={errorLink}
              helperText={errorLink}
              variant="outlined"
              fullWidth
              label="Resolution Source (Website Link)"
              required
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              fullWidth
              label="Additional Details (Optional)"
              multiline
              rows={10}
              value={additional}
              onChange={(e) => setAdditional(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={onSubmit}
              variant="outlined"
              color="primary"
              size="large"
            >
              Create Market
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const formBackgroundStyle = {
  width: "100%",
  padding: "26px",
  margin: "0px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0px 1px 7px -2px #828282",
};

export default MarketCreate;
