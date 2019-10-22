import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends Component {

  state = {
    open: true,
    newPaletteName: '',
  }

  componentDidMount = () => {
    const { palettes } = this.props;

    // Compare user palette name against existing palette names for uniqueness
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Open or close Dialog Form
  handleClickOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const { open, newPaletteName } = this.state;
    const { handleSubmit, palettes, hideForm } = this.props;

    return (
        <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

          <ValidatorForm
            onSubmit={() => handleSubmit(newPaletteName)}
            onError={errors => console.log(errors)}
          >
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette!
                Make sure it's unique!
              </DialogContentText>

              <Picker set='emojione' />

              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already taken']}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
            </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>

          </ValidatorForm>
        </Dialog>
    );
  }
}


export default PaletteMetaForm;
