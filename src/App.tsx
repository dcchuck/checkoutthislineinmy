import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Share from './Share';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

const Browse = () => <div>Browse</div>

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/"><h1>Check Out This Line In My...</h1></Link>
          <ul>
            <li><Link to="/browse">BROWSE</Link></li>
            <li><Link to="/share">SHARE</Link></li>
          </ul>

          <Route exact path="/" component={Home} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/share" component={Share} />
        </div>
      </Router>
    );
  }
}

export default App;
