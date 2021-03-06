/**
 * FriendListResults.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: Nathan Lin, Angel Martinez-Portillo, Mason Rylander
 * 
 * Description: Show the list of friends a user has
 * 
 * credit: https://material-kit-react.devias.io/
 * 
 * License: MIT License
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography, Button
} from '@mui/material';
import getInitials from './getInitials';
import { fetchDeleteFriend, fetchFriends} from '../../ApiCalls';

/*
  theme: 
    This sets the MUI styling for the following code.
*/
const RootStyle = styled(TableContainer)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
});

/**
* FriendListResults: 
*
* This will display the user's friend list.
* The function of deleting friends can also be implemented.
*
* Params: setIdResults, removeItem
* Returns: A TableContainer component that contains friend list and delete button.
*/
const FriendListResults = ({setIdResults, removeItem}) => {
  const [Friends, setFriends] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  function refreshFriends(){
    fetchFriends().then(list => {
      setFriends(list)
    });
  }

  /*
    useEffect:
      This function can be used when the function component gets called. In this
      instance, it only activates once per load, and it refresh the friends page
      and it will change the "setIdResults" state to [].
    Params: N/A
    Returns: N/A
  */
  useEffect(() => {
    refreshFriends();
    setIdResults([]);
  }, [setIdResults])

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <RootStyle>
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
              {Friends
                .slice(page * limit, page * limit + limit) // slice page
                  .map((Friend) => (
                <TableRow
                  hover
                  key={Friend.id}
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
                        src={Friend.user.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(Friend.user.username)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {Friend.user.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {Friend.user.email}
                  </TableCell>   
                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={async (e) => {
                        await fetchDeleteFriend(Friend.id);
                        
                        removeItem(Friend.id);
                        console.log(`Accepting: ${Friend.id}`)
                        refreshFriends();
                        }
                      }
                      >
                      Delete
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
        count={Friends.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </RootStyle>
  );
};

FriendListResults.propTypes = {
  Friends: PropTypes.array.isRequired
};

export default FriendListResults;
