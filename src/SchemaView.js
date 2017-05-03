import React, { Component } from 'react';
import SchemaStore from './SchemaStore';
import SchemaActions from './SchemaActions';

class SchemaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

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
      rows: schema.rows
    })
  }

  saveRows(rows) {
    console.log(rows);
  }

  render() {
    if (this.state.rows) {
      let columns = {
        headers: [[
          { value: 'Name', action: 'header' }
          ,{ value: 'Type', action: 'header' }
          ,{ value: '', action: 'header' }
        ]]
        ,styles: [[
          { width: '80px', height: '20px' }
          ,{ width: '80px', height: '20px' }
          ,{ width: '50px', height: '20px' }
        ]]
      };
      let rows = this.state.rows.map(
        (r) => r.map((f) => new Object({ value: f, action: 'input' }))
                .concat(new Object({ value: 'delete', action: 'delete' }))
      );

      return (
        <DataGridView
          columns={columns}
          rows={rows}
          saveClickHandler={this.saveRows} />
      );
    } else {
      return null;
    }
  }
}

export default SchemaView;
