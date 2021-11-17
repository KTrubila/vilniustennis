import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/other/AuthRoute";
import store from "./redux/store";
import {
  logoutUser,
  setAuthenticated,
  getUserData,
} from "./redux/slices/userSlice";
import { setScreenWidth } from "./redux/slices/uiSlice";

//MUI theme
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Components
import Navbar from "./components/navbar/Navbar";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import userPage from './pages/userPage';
import timeTable from './pages/timeTable';

axios.defaults.baseURL = "https://europe-west1-vilniustennis-4a9c3.cloudfunctions.net/api";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00352c",
    },
    secondary: {
      main: "#26a69a",
    },
  },
});

window.addEventListener("resize", () =>
  store.dispatch(setScreenWidth(window.innerWidth))
);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < new Date()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch(setAuthenticated());
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const App = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/user/:userPageHandle" component={userPage} />
              <Route exact path="/user/:userPageHandle/smash/:smashId" component={userPage} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/timetable" component={timeTable} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
