// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  signup: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

function handleStatus(status) {
  console.log(status);
  if (status === 1) {
    return <h3>Passwords do not match!</h3>;
  }
  if (status === 2) {
    return <h3>Email address is already used!</h3>;
  }
  return <div />;
}

const CreateAccount = ({ classes, handleSignup, status }: props) => (
  <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="headline">Sign up</Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password2">Password again</InputLabel>
            <Input
              name="password2"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              const user = document.getElementById('email').value;
              const pass = document.getElementById('password').value;
              const pass2 = document.getElementById('password2').value;
              handleSignup(user, pass, pass2);
            }}
          >
            Sign Up
          </Button>
          {handleStatus(status)}
        </form>
      </Paper>
    </main>
  </React.Fragment>
);

export default withStyles(styles)(CreateAccount);
