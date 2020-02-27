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
    
});

function Transaction(props) {
    const [transactions, setTransactions] = useState([]);
    const classes = useStyles();
    const renderTransactionLine = () => {
        if (transactions.length > 0) {
            return transactions.map((transaction) => (<TransactionLine key={transaction.id} transaction={transaction} />));
        }
        return null;
    };
    //return renderTransactionLine();
    useEffect(() => {
        if (!authService.isLoggedIn()) {
            props.history.replace('/login');
        } else {
            authService.fetch('/transaction/list', {
                method: 'GET'
            }).then(data => {
                setTransactions(data);
            }).catch(err => {
                console.log(err);
            })

        }
    }, []);


    return (
        <div>
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

            <Fab color="secondary" aria-label="add" className={classes.fabButton} href='/transaction/new'>
                <AddIcon />
            </Fab>
        </div>
    );
    /* 
        constructor(props) {
            super(props);
            this.Auth = new AuthService();
            this.state = {
                history: null,
                tokenInfo: null
            }
        }
    
        getTransactionList() {
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };
    
            const bodyParameters = {
    
            };
    
            axios.get(
                'http://mymoney.local/api/transaction/list',
                bodyParameters,
                config
            ).then(response => {
                console.log(response);
                this.setState({
                    transactions: response
                });
            }).catch(error => {
    
            });
        }
    
        componentDidMount() {
            // redirect to login if no auth
            if (!this.Auth.isLoggedIn()) {
                this.setState({
                    history: '/login'
                });
    
            } else {
                this.Auth.fetch('/transaction/list', {
                    method: 'GET'
                }).then(data => {
                    console.log(data);
                    this.setState({
                        transactions: data
                    });
                }).catch(err => {
                    console.log(err);
                })
    
            }
    
        }
    
        renderTransactionLine() {
            if (null != this.state.transactions) {
                return this.state.transactions.map(transaction => (
                    <TransactionLine key={transaction.id} transaction={transaction} />
                ));
            } else {
                return null;
            }
        }
    
        render() {
            if (this.state.history) {
                return (<Redirect to={this.state.history} />);
            } else {
                return (
                    <ul>{this.renderTransactionLine()}</ul>
                )
            }
        } */
}

export default withRouter(Transaction);
