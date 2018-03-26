import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

class ColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = { background: this.props.setColor };
    // this.handleChange = this.handleChange.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  // handleChange(color) {
  //   this.setState({ background: color.hex });
  // }

  handleChangeComplete(color, event) {
    this.props.changeColor(color);
    this.setState({ background: color.hex });
  }


  render () {
    return (
      <ChromePicker
        color={ this.state.background }
        disableAlpha={ true }
        // onChange={ this.handleChange }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}

export default ColorPicker;