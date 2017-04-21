import React, { Component } from 'react';
import './DataGrid.css';

function Cell(props) {
  return (
    <input className="cell" defaultValue={props.value} onClick={() => props.onClick()} />
  );
}

class Row extends Component {
  render() {
    return (
      <div className='row'>
        {this.props.fields.map((f, i) => <Cell value={f} onClick={this.props.columns[i].clickHandler} />)}
      </div>
    );
  }
}

class RowHeader extends Component {
  render() {
    return (
      <div className='row'>
        {this.props.columns.map((c) => <Cell value={c.header} onClick={c.headerClickHandler} />)}
      </div>
    );
  }
}

class DataGrid extends Component {
  render() {
    return (
      <div className='dataGrid'>
        <RowHeader columns={this.props.columns} />
        {this.props.rows.map((r, i) => <Row fields={r} columns={this.props.columns} />) }
      </div>
    );
  }
}

export default DataGrid;
