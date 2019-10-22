import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {

  state = {
    open: false,
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
  handleClickOpen = () => this.setState({open: true})
  handleClose = () => this.setState({open: false});

  render() {
    const { open, newPaletteName } = this.state;
    const { handleSubmit, palettes } = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>

            <ValidatorForm
              onSubmit={() => handleSubmit(newPaletteName)}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already taken']}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>

          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}


export default PaletteMetaForm;
