import React, { Component } from 'react';
import Uuid4 from 'uuid/v4';
import Cell from './Cell';
import './DataGridView.css';

class Row extends Component {
  render() {
    return (
      <div className='row'>
        {this.props.fields.map((f, i) =>
          <Cell key={Uuid4()} cellIndex={i} value={f.value} action={f.action}
            style={this.props.styles[i]}
            onHeaderClick={(e, c) => this.props.headerClickHandler(e, i)}
            onDeleteButtonClick={(e, r) => this.props.deleteButtonClickHandler(e, r)}
            onInputChange={(e, r, c) => this.props.cellChangeHandler(e, this.props.rowIndex, c)} />
        )}
      </div>
    );
  }
}

export default Row;
