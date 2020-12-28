import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({wallet ,connect}) {
  const classes = useStyles();

  return (
    <div className="column-flex">
        <Card className={classes.root} >
            <CardContent>
                <Typography className={classes.title} color="black" gutterBottom>
                    Your Public Key Hash :<br/>{wallet.accountPkh}
                </Typography>
                <Typography className={classes.title} color="black" gutterBottom>
                    Balance : {wallet.accountBalance.toNumber()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button style={{margin:"auto"}} size="small" variant="outlined" color="primary" onClick={connect}>Switch Account</Button>
            </CardActions>
        </Card>
    </div>
  );
}

