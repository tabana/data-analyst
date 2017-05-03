import React, { Component } from 'react';
import './DataGridView.css';

class Cell extends Component {
  render() {
    return (
      <div className='cell'>
        {this.props.action === 'input' &&
          <input style={this.props.style} className='cellInput' defaultValue={this.props.value}
            onChange={this.props.onInputChange}
            onClick={this.props.onClick} />
        }
        {this.props.action === 'delete' &&
          <button style={this.props.style} className='button cellButton' onClick={this.props.onClick}>
            {this.props.value}
          </button>
        }
        {this.props.action === 'header' &&
          <div style={this.props.style} className='header' onClick={this.props.onHeaderClick}>
            {this.props.value}
          </div>
        }
      </div>
    );
  }
}

export default Cell;
