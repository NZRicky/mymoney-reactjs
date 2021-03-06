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

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
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


function TransactionNew(props) {
    const classes = useStyles();

    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
        ...input,
        [e.target.name]: e.target.value
    })

    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };


    const [cates, setCates] = useState([{
        id: 0,
        name: 'Loading...'
    }]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authService.isLoggedIn()) {
            props.history.replace('/login');
        } else {
            let unamounted = false;
            // load category
            authService.fetch('/category/list', {
                method: 'GET'
            })
                .then(res => {
                    console.log(res);
                    setCates(res);
                    setLoading(false);
                }).catch(err => {
                    alert(err);
                });
                return () => {
                   unamounted = true;     
                };
        }
    }, []);



    const handleFormSubmit = e => {
        e.preventDefault();
        const postData = {
            ...input,
            createdAt: selectedDate,
            category: cate
        };
        authService.fetch('/transaction/new', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(postData)
        })
            .then(res => {
                props.history.replace('/');
            }).catch(err => {
                alert(err);
            });
        // console.log(authService);

    }

    const [cate, setCate] = React.useState('');
    const handleChange = event => {
        setCate(event.target.value);
    };


    const renderCategorySelect = () => {
        
        if (cates.length > 0) {
            return cates.map((cate) => (<MenuItem value={cate.id}>{cate.name}</MenuItem>));
        }
        return null;
    };
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">New Transaction</Typography>
                <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            name="createdAt"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date"
                            format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl className={classes.form}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            disabled={loading} 
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cate}
                            onChange={handleChange}
                        >
                            {cates.map((cate) => (<MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        margin="normal"
                        name="amount"
                        label="Amount"
                        type="text"
                        id="amount"
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="notes"
                        label="Notes"
                        type="text"
                        id="notes"
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


export default withRouter(TransactionNew);
