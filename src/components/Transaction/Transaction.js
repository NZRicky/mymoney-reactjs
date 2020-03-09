import React, { Component, useState, useEffect } from 'react';
import TransactionLine from './TransactionLine';
import axios from 'axios';
import AuthService from '../Auth/AuthService';
import { Redirect, withRouter } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SimpleBottomNavigation from '../UI/SimpleBottomNavigation';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PaginationLink from '../UI/PaginationLink';
import { Grid } from '@material-ui/core';


const authService = new AuthService();

const useStyles = makeStyles({
    table: {
        //minWidth: 650,
        //margin: '50 0'

    },
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 60,
        right: 20,
        margin: '0 auto',
    },
    pagination: {
        marginTop: 20
    }

});

function Transaction(props) {
    const [isLogged, setIsLogged] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const classes = useStyles();

    const renderTransactionLine = () => {
        if (transactions.length > 0) {
            return transactions.map((transaction) => (<TransactionLine key={transaction.id} transaction={transaction} />));
        }
        return null;
    };

    // check if logged in every time when refresh the page
/*     useEffect(() => {
        if (authService.isLoggedIn()) {
            setIsLogged(true);
        }
    }); */

    // only check once if logged in when first time loading the page
    // load transaction list if logged in
    useEffect(() => {
        if (!authService.isLoggedIn()) {
            props.history.replace('/login');
        } else {
            authService.fetch('/transaction/list', {
                method: 'GET'
            }).then(resp => {
                setTransactions(resp.data);
                setTotalPages(resp.totalPages);
            }).catch(err => {
                console.log(err);
            })

        }
    }, []);


    return (
        <div style={{ paddingBottom: '120px' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTransactionLine()}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid item xs={12} className={classes.pagination}>
            <PaginationLink totalPages={totalPages} />
            </Grid>

            <Fab color="secondary" aria-label="add" className={classes.fabButton} href='/transaction/new'>
                <AddIcon />
            </Fab>
            <SimpleBottomNavigation />
        </div>
    );
}

export default withRouter(Transaction);
