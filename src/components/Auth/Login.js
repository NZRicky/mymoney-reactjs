import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import { withRouter } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    render() {
        return (
            // Login form here
            <form>
                Usernaname: <input type="text" name="username" onChange={this.handleChange} />
                Password: <input type="password" name="password" onChange={this.handleChange} />
                <input type="button" value="submit" onClick={this.handleFormSubmit} />
            </form>
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                this.props.history.replace('/');
            }).catch(err => {
                alert(err);
            });

    }
}


export default withRouter(Login);
