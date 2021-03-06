import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {AppBar, Toolbar, Typography} from '@material-ui/core';
import Link from '@material-ui/core/Link';

import './Header.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={"appHeaderBar"}>
      <Toolbar>

        <Typography variant="h5" className={classes.title}>
          <b>Scene Together In...</b>
        </Typography>

        <ul className="app-header-link-list">
          <li>
            <Link href="/actors" color="secondary">
              <b>Search by actors</b>
            </Link>
          </li>

          <li>
            <Link href="/shows" color="secondary">
            <b>Search by shows</b>
            </Link>
          </li>
        </ul>

      </Toolbar>
    </AppBar>
  );
} 

export default Header;