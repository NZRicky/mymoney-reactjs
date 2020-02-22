import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            // Login form here
            <form>
                Usernaname: <input type="text" />
                Password: <input type="password" />
                <input type="button" value="submit" />
            </form>
        );
    }
}