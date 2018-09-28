// @flow
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  header: {
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
});

const Dashboard = ({ username, classes }: props) => (
  <div>
    <h3 className={classes.header}>Welcome to LetItFly, {username}</h3>
  </div>
);

export default withStyles(styles)(Dashboard);
