import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//Components
import Navbar from './components/Navbar'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80d6ff',
      main: '#42a5f5',
      dark: '#0077c2',
      contrastText: "#fff"
    },
    secondary: {
      light: '#efefef',
      main: '#bdbdbd',
      dark: '#8d8d8d',
      contrastText: "#fff"
    },
  },
  typography:{
    useNextVariants: true
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
     <Router>
     <Navbar/>
     <div className="container">
     <Switch>
       <Route exact path ='/' component = {home}/>
       <Route exact path ='/login' component = {login}/>
       <Route exact path ='/signup' component = {signup}/>
     </Switch>
     </div>
     </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
