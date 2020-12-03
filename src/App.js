import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import News from './pages/News';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  function App() {
    return (
      <Router>
        <div className="App">
          <ToastContainer autoClose={2200} />
          <Nav />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/news" component={News} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  };

export default App;