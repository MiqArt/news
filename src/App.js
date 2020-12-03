import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import News from './pages/News';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SET_USER } from './store/actions';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  const currentUser = localStorage.getItem("newsUser");
  if (currentUser) {
    dispatch({ type: SET_USER, user: JSON.parse(currentUser) });
  }
  console.log(localStorage.getItem("newsUser"));
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