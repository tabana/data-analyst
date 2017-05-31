import React, { Component } from 'react';

class ButtonFormatter extends Component {
    render() {
        return (
            <button
                className='button cellButton'
                onClick={(e, i) =>this.props.value.clickHandler(e, i)}>{this.props.value.text}
            </button>
        );
    }
}

export default ButtonFormatter;
