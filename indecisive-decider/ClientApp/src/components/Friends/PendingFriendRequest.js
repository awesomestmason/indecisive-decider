/**
 * FriendListResults.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: 
 * 
 * Description: 
 */

import { useState, useEffect } from 'react';
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
import { fetchAcceptFriend, fetchDeclineFriend, fetchFriendRequests } from '../../ApiCalls';


const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
});

/**
 * PendingFriendRequest
 * 
 * show the pending friend result list
 * 
 * Params: emoveItem, setIdResults, and rest props
 * Returns: A Card container that contains pending friend result list.
 */

const PendingFriendRequest = ({removeItem, setIdResults, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [Requests, setFriendsRequests] = useState([]);

  function refreshRequests(){
    fetchFriendRequests().then(list => {
      setFriendsRequests(list);
    });
  }

  useEffect(() => {
    refreshRequests();
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
        <Box sx={{ minWidth: 1050 }}>
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
              {Requests
                .slice(page * limit, page * limit + limit) // slice page
                  .map((Request) => (
                <TableRow
                  hover
                  key={Request.id}
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
                        src={Request.avatarUrl} //TODO need avatar url api
                        sx={{ mr: 2 }}
                      >
                        {getInitials(Request.user.username)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {Request.user.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {Request.user.email}
                  </TableCell>
                  <TableCell>
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={async (e) => {
                      await fetchAcceptFriend(Request.id);
                      removeItem(Request.id);
                      refreshRequests();
                      console.log(`Accepting: ${Request.id}`)}
                    }
                    >
                    Accept Friend
                    </Button>
                    <Button
                    color="error"
                    variant="contained"
                    onClick={async (e) => {
                      await fetchDeclineFriend(Request.id);
                      removeItem(Request.id);
                      refreshRequests();
                      console.log(`Declining: ${Request.id}`)}
                    }
                    >
                    Decline Friend
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
        count={Requests.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </RootStyle>
  );
};

PendingFriendRequest.propTypes = {
  Requests: PropTypes.array.isRequired
};

export default PendingFriendRequest;
