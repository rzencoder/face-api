import React from 'react';

class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3001/register', 
        {method: 'post', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        })},
        ).then(res => res.json())
        .then(user => {
            if(user) {
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
            <legend >Register</legend>
            <div>
                <label htmlFor="name">Name</label>
                <input onChange={this.onNameChange} type="text" name="name"  id="name" />
            </div>
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
            <input onClick={this.onSubmitRegister} type="submit" value="Sign in" />
            </div>
        </div>
        </main>
        </div>
    )
    }
}

export default Register;