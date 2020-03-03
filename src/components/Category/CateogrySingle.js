import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* const CateLine = ({cate}) => (
    <li>
        <p>{cate.amount}</p>
    </li>
); */
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function CategorySingle({cate}) {
    const classes = useState();

    return (
        <TableRow key={cate.id}>
            <TableCell component="th" scope="row"> 
               {cate.id}
            </TableCell>
            <TableCell align="right">{cate.name}</TableCell>


        </TableRow>
    )
}


export default CategorySingle;
