import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import SchemaView from './SchemaView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <SchemaView name='TdmlCalypso' />
            </Col>
            <Col md={6}>
              <SchemaView name='TdmlCalypso2' />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
