import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import ButtonFormatter from './ButtonFormatter'
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

  rowGetter(i) {
    return this._rows[i];
  }
  
  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  }

  handleGridDeleteButtonClicked(element, rowIndex) {
    this.state.rows.splice(rowIndex, 1);
    this.setState(this.state);
  }

  render() {
    if (this.state.rows) {
      let columns = [
          { key: 'name', name: 'Name', editable: true, resizable: true }
          ,{ key: 'sqlType', name: 'Type', editable: true, resizable: true }
          ,{ key: 'deleteButton', name: '', formatter:ButtonFormatter, resizable: true }
      ]
      let rows = this.state.rows.map(
        (r, i) => ({
          name: r[0],
          sqlType: r[1],
          deleteButton: {
           rowIndex: i,
           text: 'delete',
           clickHandler: (e, ri) => this.handleGridDeleteButtonClicked(e, i)
          }
        })
      );
      
      return (
        <ReactDataGrid
          enableCellSelect={true}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          enableRowSelect={true}
          columns={columns}
          rowGetter={(i) => {return rows[i]}}
          rowsCount={rows.length}
          minHeight={500} />
      );
    } else {
      return null;
    }
  }
}

export default SchemaView;
