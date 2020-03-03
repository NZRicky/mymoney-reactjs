import React, { Component, useState } from 'react';
import AuthService from '../Auth/AuthService';
import { withRouter } from "react-router-dom";

//ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const authService = new AuthService();

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                By Ricky
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
/*
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
}*/


function Login(props) {
    const classes = useStyles();

    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
        ...input,
        [e.target.name]: e.target.value
    })

    const handleFormSubmit = e => {
        e.preventDefault();

        authService.login(input.username, input.password)
            .then(res => {
                props.history.replace('/');
            }).catch(err => {
                alert(err);
            });
        // console.log(authService);

    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Sign In</Button>
                    
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}


export default withRouter(Login);
