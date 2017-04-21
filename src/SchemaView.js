import React, { Component } from 'react';
import SchemaStore from './SchemaStore';
import SchemaActions from './SchemaActions';
import DataGrid from './DataGrid';

class SchemaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: []
    };

    this.updateState = this.updateState.bind(this);
    SchemaStore.get();
  }

  componentWillMount() {
    SchemaStore.registerListener(this.updateState);
  }

  componentDidMount() {
    SchemaActions.getSchema();
  }

  componentWillUnmount() {
    SchemaStore.deregisterListener(this.updateState);
  }

  updateState() {
    let schema = SchemaStore.get();
    this.setState({
      columns: schema.headers.map(
        (h) => ({
          header: h
          ,headerClickHandler: () => alert('COLUMN 0 HEADER')
          ,clickHandler: () => alert('CELL IN COLUMN 0')
        })
      )
      ,rows: schema.rows
    });
  }

  render() {
    if (this.state.rows) {
      return (
        <DataGrid rows={this.state.rows} columns={this.state.columns} />
      );
    } else {
      return null;
    }
  }
}

export default SchemaView;
