import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch,Link as Link1 } from 'react-router-dom';
import {NavMenu} from './NavMenu'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <div >
          <NavMenu />
          <Switch>
            <Route exact path={["/login", "/"]} component={Login} />
            <Route exact path={["/signup"]} component={Signup} />
            <Route exact path={["/profile"]} component={Profile} />
            <Route />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
