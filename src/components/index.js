import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { blue600, grey900 } from "material-ui/styles/colors";

export default class App extends Component {
  state = {
    loading: false
  };
  render() {
    const themeDefault = getMuiTheme({
      palette: {},
      appBar: {
        height: 57,
        color: blue600
      },
      drawer: {
        width: 230,
        color: grey900
      },
      raisedButton: {
        primaryColor: blue600
      }
    });

    return this.state.loading === true
      ? <h1>Loading</h1>
      : <BrowserRouter>
          <div>
            <MuiThemeProvider style={themeDefault}>
              <div>
                <Header />
                <nav>
                  <Route path="/" exact component={Home} />
                </nav>
              </div>
            </MuiThemeProvider>
          </div>
        </BrowserRouter>;
  }
}
