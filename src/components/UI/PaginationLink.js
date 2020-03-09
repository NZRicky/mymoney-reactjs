import React from 'react';
//import { MemoryRouter, Route } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationLink(props) {
  return (
    <Router initialEntries={['/']} initialIndex={0}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get('page'), 10) || 1;

          return (
            <Pagination
              page={page}
              count={props.totalPages}
              renderItem={item => (
                <PaginationItem
                  component={Link}
                  to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          );
        }}
      </Route>
    </Router>
  );
}