import { Grid } from '@material-ui/core';
import React from 'react';
import { register } from '../../api/PublicAPI';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGeneralError: false,
      showUserExistsError: false,
    };
  }

  handleRegister = (firstName, lastName, email, password) => {
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    register(data)
      .then(() => {
        const { history } = this.props;
        history.push('/confirm-email');
      })
      .catch((ex) => {
        const { status } = ex.response;
        if (status === 409) this.setState({ showUserExistsError: true });
        else this.setState({ showGeneralError: true });
      });
  };

  render() {
    const { showGeneralError, showUserExistsError } = this.state;

    const hideGeneralError = () => {
      this.setState({ showGeneralError: false });
    };

    const hideUserExistsError = () => {
      this.setState({ showUserExistsError: false });
    };
    return (
      <>
        {showGeneralError && (
          <CustomSnackbar
            topCenter
            message="Bad request"
            onClose={hideGeneralError}
            severity="error"
          />
        )}
        {showUserExistsError && (
          <CustomSnackbar
            topCenter
            message="User with this email already exists"
            onClose={hideUserExistsError}
            severity="error"
          />
        )}
        <Grid
          container
          className="root"
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={10} sm={6} md={4}>
            <RegistrationForm onRegister={this.handleRegister} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default RegisterPage;
