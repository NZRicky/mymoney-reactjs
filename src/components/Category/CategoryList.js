import React, { Component, useState, useEffect } from 'react';
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
import CategorySingle from './CateogrySingle';


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

function CategoryList(props) {
    const [cates, setCates] = useState([]);
    const classes = useStyles();
    const renderCategoryLine = () => {
        if (cates.length > 0) {
            return cates.map((cate) => (<CategorySingle key={cate.id} cate={cate} />));
        }
        return null;
    };
    //return renderCategoryLine();
    useEffect(() => {
        if (!authService.isLoggedIn()) {
            props.history.replace('/login');
        } else {
            authService.fetch('/category/list', {
                method: 'GET'
            }).then(data => {
                setCates(data);
            }).catch(err => {
                console.log(err);
            })

        }
    }, []);


    return (
        <div style={{paddingBottom: '120px'}}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderCategoryLine()}
                    </TableBody>
                </Table>
            </TableContainer>

            <Fab color="secondary" aria-label="add" className={classes.fabButton} href='/category/new'>
                <AddIcon />
            </Fab>
        </div>
    );
    
}

export default withRouter(CategoryList);
