import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { SettingsInputAntenna } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "18vw",
      marginTop:"0.5vh"
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

const AccountCard = () => {
  //const [hovering, setHovering] = useState(false);
  const [age,setage] = useState('');

  //const { address, title } = props.market;

  const classes = useStyles(); 
  return (
      <div className="column-flex">
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography className={classes.title}>
                            Who will win todays match Ind or Aus ?
                        </Typography>
                        <Typography className={classes.market} color="textSecondary">
                            KT1Ao5qCMyowNgnsobd2bkbCQVcVe9813ye8
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {/* <Grid container> 
                            <Grid item xs={12}> */}
                            <FormControl variant="outlined" className={classes.formControl} size="small">
                                <InputLabel id="demo-simple-select-outlined-label">Result</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={age}
                                        onChange={(e)=>{setage(e.target.value)}}
                                        label="Age"
                                    >
                                    <MenuItem value={0}>Long</MenuItem>
                                    <MenuItem value={1}>Short</MenuItem>
                                    </Select>
                            </FormControl>
                            {/* </Grid> */}
                            {/* <Grid item xs={12}> */}
                                <Button 
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  style={{marginLeft:"0.5vw",minWidth:"18vw"}}
                                >
                                    Submit Result
                                </Button>
                            {/* </Grid> */}
                        {/* </Grid> */}
                    </Grid>
                </Grid>
              </CardContent>
        </Card>
      </div>
  );
};


export default AccountCard;
