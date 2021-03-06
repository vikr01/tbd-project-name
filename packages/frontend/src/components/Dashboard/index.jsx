// @flow
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import backendRoutes from 'toms-shuttles-backend/lib/routes';
import { Redirect } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItems from './ListItems';
import AccountInfoView from './AccountInfo';
import OverviewView from './Overview';
import routes from '../../routes';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

type Props = {
  classes: Object,
};

class Dashboard extends Component<Props> {
  props: Props;

  state = {
    open: true,
    redirectToLogin: false,
    checkedForLogin: false,
    accountType: null,
    page: 'Dashboard',
  };

  async componentDidMount() {
    try {
      const res = await axios.get(backendRoutes.LOGGED_IN);
      this.setState({
        redirectToLogin: false,
        checkedForLogin: true,
        accountType: res.data,
      });
    } catch (e) {
      console.error(e);
      this.setState({
        redirectToLogin: true,
        checkedForLogin: true,
      });
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenuClick = async e => {
    if (e === 'Logout') {
      try {
        await axios.get(backendRoutes.LOGOUT);
      } catch (ee) {
        console.error(ee);
        //
      }
      this.setState({ redirectToLogin: true });
    }
    this.setState({ page: e });
  };

  render() {
    const { classes } = this.props;
    const {
      open,
      page,
      redirectToLogin,
      checkedForLogin,
      accountType,
    } = this.state;
    if (!checkedForLogin) {
      return <Typography>Logging in...</Typography>;
    }
    if (redirectToLogin) {
      return <Redirect to={routes.HOME} />;
    }
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                {`Tom's Shuttle Service`}
              </Typography>
              <ListItems
                onClick={e => {
                  this.handleMenuClick(e);
                }}
              />
            </Toolbar>
          </AppBar>
          <ShowMainContent accountType={accountType} page={page} />
        </div>
      </Fragment>
    );
  }
}

type MainContentProps = {
  page: string,
  accountType: string,
};

const ShowMainContent = ({ page, accountType }: MainContentProps) => {
  if (page === 'Account') {
    return <AccountInfoView />;
  }
  if (page === 'Dashboard') {
    return <OverviewView accountType={accountType} />;
  }
  return null;
};

export default withStyles(styles)(Dashboard);
