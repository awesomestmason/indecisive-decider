/**
 * FriendListResults.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: 
 * 
 * Description: 
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography, Button,

} from '@mui/material';
import getInitials from './getInitials';
import { fetchSendFriendRequest } from '../../ApiCalls';

const RootStyle = styled(Card)({ // set the card style by css
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
});

/**
 * show the friend search result list
 */
const SearchFriendsResults = ({ queryResults, removeItem, setIdResults, ...rest }) => {
  // const [selectedQueryResultIds, setSelectedQueryResultIds] = useState([]);
  const [limit, setLimit] = useState(10); 
  // Set the maximum number of friends that can be displayed on each page
  const [page, setPage] = useState(0);
  // set page number

  useEffect(() => {
    setIdResults([]);
  }, [setIdResults])


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <RootStyle {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queryResults
                .slice(page * limit, page * limit + limit) // slice page
                  .map((queryResult) => (
                <TableRow
                  hover
                  key={queryResult.id}
                >
                <TableCell>
                </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={queryResult.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(queryResult.username)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {queryResult.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {queryResult.email}
                  </TableCell>
                  <TableCell>
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={async event => {
                      console.log("Sending friend request to user " + queryResult.id);
                      removeItem(queryResult.id);
                      await fetchSendFriendRequest(queryResult.id);
                    }}
                    >
                    Send Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={queryResults.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </RootStyle>
  );
};

SearchFriendsResults.propTypes = {
  queryResults: PropTypes.array.isRequired
};

export default SearchFriendsResults;
