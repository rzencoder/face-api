import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  onNameChange = (event) => {
      this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    }

    onSubmit = () => {
      const url = 'http://localhost:3001/' + this.props.route;
      fetch(url,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
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
      const title = this.props.route.toUpperCase();
      return (
        
        <div className="form-container">
        <div className="form">
            <h3>{title}</h3>
            <div className="form-input-container">
            {this.props.route === "register" ? <div>
                <label htmlFor="name">Name</label>
                <input onChange={this.onNameChange} type="text" name="name" id="name" />
            </div> : '' }
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
            <input className="submit-btn" onClick={this.onSubmit} type="submit" value="Sign in" />
            </div>
            </div>
        </div>
      );
    }
}

export default SignIn;
