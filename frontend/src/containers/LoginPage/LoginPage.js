import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';
import sideImage from '../../assets/LoginPage/side-image.svg';
import { authenticate, getCurrentUser } from '../../api/PublicAPI';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import './styles.css';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showWrongCredentialsError: false,
      showGeneralError: false
    }
  }

  handleLogin = (mail, password) => {
    authenticate(mail, password).then(responseToken => {

      const token = responseToken.data;
      getCurrentUser(token).then(responseUserData => {

        const { id, firstname, lastname, email } = responseUserData.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("firstname", firstname);
        sessionStorage.setItem("lastname", lastname);
        sessionStorage.setItem("email", email);
        window.location.reload();

      }).catch(() => this.setState({ showGeneralError: true }));

    }).catch(ex => {
      const { status } = ex.response;
      if (status === 401) this.setState({ showWrongCredentialsError: true });
      else if (status === 500) this.setState({ showGeneralError: true });
    });
  }

  render() {

    const { showGeneralError, showWrongCredentialsError } = this.state;

    const hideGeneralError = () => {
      this.setState({ showGeneralError: false });
    }

    const hideWrongCredentialsError = () => {
      this.setState({ showWrongCredentialsError: false });
    }


    return (
      <>
        {showGeneralError &&
          <CustomSnackbar
            topCenter
            message="A server error has occurred"
            onClose={hideGeneralError}
            severity="error" />
        }
        {showWrongCredentialsError &&
          <CustomSnackbar
            topCenter
            message="Email or password is not correct"
            onClose={hideWrongCredentialsError}
            severity="error" />
        }
        <Grid
          container
          className="root"
          justify="space-evenly"
          direction="row"
          alignItems="center"
        >
          <Hidden smDown>
            <Grid item>
              <img
                src={sideImage}
                alt="Two people looking at their smart devices in front of a video screen"
              />
            </Grid>
          </Hidden>
          <Grid item xs={10} sm={6} md={3}>
            <LoginForm
              onLogin={this.handleLogin} />
          </Grid>
        </Grid>
      </>
    );
  }
}



export default LoginPage;
