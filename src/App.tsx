import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';

import Actors from 'features/actors/Actors';
import Shows from 'features/shows/Shows';
import Header from 'shared/containers/header/Header';
import Footer from 'shared/containers/footer/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffbe3d',
      dark: '#8E793E',
      contrastText: '#231F20',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
    background: {
      default: "#231F20"
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#ffbe3d',
    }
  },
});

function App() {
  
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <div className={"flex-wrapper"}>
            <Header />

            <Switch>
              <Route exact path="/" >
                <Actors />
              </Route>

              <Route path="/actors">
                <Actors />
              </Route>

              <Route path="/shows">
                <Shows />
              </Route>
            </Switch>

            <Footer />
          </div>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
