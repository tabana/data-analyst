import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

class DeleteButtonFormatter extends Component {
    render() {
        return (
            <button onClick={this.props.value.clickHandler(e, i)}>{this.props.value.text}</button>
        );
    }
}

export default DeleteButtonFormatter;