import React, { Component } from 'react';
import SchemaView from './SchemaView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <SchemaView name='TdmlCalypso2' />
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <SchemaView name='TdmlCalypso' />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
