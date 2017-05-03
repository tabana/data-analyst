import React, { Component } from 'react';
import Uuid4 from 'uuid/v4';
import Row from './Row';
import './DataGridView.css';

class SaveButton extends Component {
  render() {
    return (
      <button className='button independentButton' onClick={() => this.props.onClick()}>
        Save
      </button>
    );
  }
}

class AddButton extends Component {
  render() {
    return (
      <button className='button independentButton' onClick={() => this.props.onClick()}>
        Add
      </button>
    );
  }
}

class DataGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      rows: this.props.rows.sort()};

    this.updateCell = this.updateCell.bind(this);
    this.updateColumn = this.updateColumn.bind(this);
    this.save = this.save.bind(this);
  }

  addRow() {
    this.state.rows.push(['', '', '']);
    this.setState(this.state);
  }

  deleteRow(element, rowIndex) {
    this.state.rows.splice(rowIndex, 1);
    this.setState(this.state);
  }

  updateCell(element, rowIndex, cellIndex) {
    this.state.rows[rowIndex][cellIndex] = element.target.value;
    this.setState(this.state);
  }

  updateColumn(element, cellIndex) {
    alert(cellIndex);
  }
   
  save() {
    this.props.saveClickHandler(this.state.rows);
  }

  render() {
    return (
      <div className='dataGrid'>
        <Row key={Uuid4()} rowIndex={null}
          fields={this.props.columns.headers[0]}
          styles={this.props.columns.styles[0]}
          headerClickHandler={(e, c) => this.updateColumn(e, c)} />
        {this.state.rows.map((r, i) =>
        <Row key={Uuid4()} rowIndex={i}
          fields={r}
          styles={this.props.columns.styles[0]}
          deleteButtonClickHandler={(e, r) => this.deleteRow(e, i)}
          cellChangeHandler={this.updateCell} />
        )}
        <AddButton onClick={() => this.addRow()} />
        <SaveButton onClick={() => this.save()} />
      </div>
    );
  }
}

export default DataGridView;
