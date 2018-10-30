import React from 'react';

class SignIn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', 
        {method: 'post', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })},
        ).then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render () {
    return (
        <div>
        <main>
        <div>
            <fieldset id="sign_up">
            <legend >Sign In</legend>
            <div>
                <label htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} type="email" name="email-address"  id="email-address" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div>
            <input onClick={this.onSubmitSignIn} type="submit" value="Sign in" />
            </div>
            <div>
            <p onClick={() => this.props.onRouteChange('register')} >Sign up</p>
            </div>
        </div>
        </main>
        </div>
    )
    }
}

export default SignIn;