import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'

//Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80d6ff',
      main: '#27aae1',
      dark: '#0077c2',
      contrastText: "#fff"
    },
    secondary: {
      light: '#efefef',
      main: '#bdbdbd',
      dark: '#8d8d8d',
      contrastText: "#fff"
    }
  } 
})

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken.exp)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false
  } else {
    authenticated = true
}
}

console.log(authenticated)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
     <Router>
     <Navbar/>
     <div className="container">
     <Switch>
       <Route exact path ='/' component = {home}/>
       <AuthRoute exact path ='/login' component = {login} authenticated={authenticated}/>
       <AuthRoute exact path ='/signup' component = {signup} authenticated={authenticated}/>
     </Switch>
     </div>
     </Router>
    </div>
    </MuiThemeProvider>
  );
}
export default App
