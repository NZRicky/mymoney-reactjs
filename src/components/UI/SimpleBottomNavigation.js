import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AuthService from '../Auth/AuthService';

const authService = new AuthService();
const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom:0
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 40,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function logout() {
    authService.logout();
    window.location.href = '/';
  }
  return (

    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Transactions" icon={<RestoreIcon />}  onClick={e => window.location.href='/'}  />
      <BottomNavigationAction label="Categories" icon={<FavoriteIcon />}  onClick={e => window.location.href='/category/list'} />
      <BottomNavigationAction label="Logout" icon={<LocationOnIcon />} onClick={e => logout()} />
    </BottomNavigation>

  );
}