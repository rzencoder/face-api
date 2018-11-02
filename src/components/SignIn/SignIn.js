import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

    onEmailChange = (event) => {
      this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
      this.setState({ signInPassword: event.target.value });
    }

    onSubmitSignIn = () => {
      fetch('http://localhost:3001/signin',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword,
          }),
        }).then(response => response.json())
        .then((user) => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        });
    }

    render() {
      return (
        <div className="form-container">
        <div className="form">
            <h3>LOGIN</h3>
            <div className="form-input-container">
            <div>
                <label htmlFor="email-address">Email</label><br/>
                <input onChange={this.onEmailChange} type="email" name="email-address" id="email-address" />
            </div>
            <div>
                <label htmlFor="password">Password</label><br/>
                <input onChange={this.onPasswordChange} type="password" name="password" id="password" />
            </div>
            </div>
            <div>
            <input className="submit-btn" onClick={this.onSubmitSignIn} type="submit" value="Sign in" />
            </div>
            </div>
        </div>
      );
    }
}

export default SignIn;
