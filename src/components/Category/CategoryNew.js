import React, { Component, useState, useEffect } from 'react';
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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
        marginTop: theme.spacing(4),
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


function CategoryNew(props) {
    const classes = useStyles();

    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
        ...input,
        [e.target.name]: e.target.value
    })

    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());


    useEffect(() => {
        if (!authService.isLoggedIn()) {
            props.history.replace('/login');
        }
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        const postData = {
            ...input

        };
        authService.fetch('/category/new',{
            method: 'POST',
            mode: 'cors', 
            cache: 'no-cache', 
            body: JSON.stringify(postData)
        })
            .then(res => {
                props.history.replace('/category/list');
            }).catch(err => {
                alert(err);
            });
        // console.log(authService);

    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">New Category</Typography>
                <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name"
                        label="Name"
                        type="text"
                        id="name"
                        onChange={handleInputChange}
                    />
                    
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Save</Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}


export default withRouter(CategoryNew);
