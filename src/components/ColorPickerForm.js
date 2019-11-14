import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from './styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {

  state = {
    currentColor: 'teal',
    newColorName: '',
  }

  componentDidMount = () => {
    // Color Name cannot already exist
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    // Color cannot already exist
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  };

  // Save color to state on input in RGBA format
  updateCurrentColor = newColor => {
    const { r, g, b, a } = newColor.rgb;
    const rgbaColor = `rgba(${r},${g},${b},${a})`;
    this.setState({ currentColor: rgbaColor });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { currentColor, newColorName } = this.state;
    const { addNewColor } = this.props;
    const newColor = { name: newColorName, color: currentColor };
    addNewColor(newColor)
    this.setState({
      newColorName: ''
    })
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div className={classes.palettePicker}>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          className={classes.picker}
          width='100%'
          disableAlpha
        />

        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            className={classes.colorNameInput}
            label="Color Name"
            value={newColorName}
            name="newColorName"
            variant='filled'
            margin='normal'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name already used',
              'Color already used',
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            aria-label="add"
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{ background: paletteIsFull ? 'grey' : currentColor }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);
