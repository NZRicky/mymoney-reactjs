import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* const TransactionLine = ({transaction}) => (
    <li>
        <p>{transaction.amount}</p>
    </li>
); */
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function TransactionLine({transaction}) {
    const classes = useState();

    return (
        <TableRow key={transaction.id}>
            <TableCell component="th" scope="row">
               {transaction.date}
            </TableCell>
            <TableCell align="right">Food</TableCell>
            <TableCell align="right">${transaction.amount}</TableCell>

        </TableRow>
    )
}


export default TransactionLine;
