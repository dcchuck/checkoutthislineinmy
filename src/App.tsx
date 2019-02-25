import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './Home';
import Share from './Share';
import Nav from './Nav';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import demoRecords from './demoRecords';

const Browse = () => <div>Browse</div>

interface IAppState {
  records: any[];
}

class App extends Component <{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      records: []
    }
  }

  public componentDidMount() {
    // TODO 
    // fetch('/api')
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(mJson => {
    //     this.setState({ records: mJson })
    //   })
    this.setState( {
      records: demoRecords
    } )
  }

  public render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route
            exact
            path="/"
            component={() => <Home records={this.state.records} />} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/share" component={Share} />
        </div>
      </Router>
    );
  }
}

export default App;
