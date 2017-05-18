import React, { Component } from 'react';

class ButtonFormatter extends Component {
    propTypes = {
        value: React.PropTypes.object
    }

    render() {
        return (
            <button className='button' onClick={(e, i) =>this.props.value.clickHandler(e, i)}>{this.props.value.text}</button>
        );
    }
}

export default ButtonFormatter;