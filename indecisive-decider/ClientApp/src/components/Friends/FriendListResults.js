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
//TODO text bold

const RootStyle = styled(TableContainer)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
  // minWidth: 1050,
});

const FriendListResults = ({setIdResults, removeItem, ...rest }) => {
  const [Friends, setFriends] = useState([]);
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  function refreshFriends(){
    fetchFriends().then(list => {
      setFriends(list)
    });
  }

  useEffect(() => {
    refreshFriends();
    setIdResults([]);
  }, [])

  const handleSelectAll = (event) => {
    let newSelectedFriendIds;

    if (event.target.checked) {
      newSelectedFriendIds = Friends.map((Friend) => Friend.id);
    } else {
      newSelectedFriendIds = [];
    }

    setSelectedFriendIds(newSelectedFriendIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFriendIds.indexOf(id);
    let newSelectedFriendIds = [];

    if (selectedIndex === -1) {
      newSelectedFriendIds = newSelectedFriendIds.concat(selectedFriendIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFriendIds = newSelectedFriendIds.concat(selectedFriendIds.slice(1));
    } else if (selectedIndex === selectedFriendIds.length - 1) {
      newSelectedFriendIds = newSelectedFriendIds.concat(selectedFriendIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFriendIds = newSelectedFriendIds.concat(
        selectedFriendIds.slice(0, selectedIndex),
        selectedFriendIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFriendIds(newSelectedFriendIds);
    // setDelfriend("true");
    setIdResults(newSelectedFriendIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <RootStyle>
      {/* <RootStyle> */}
      <PerfectScrollbar>
        {/* <Box sx={{ minWidth: 1050 }}> */}
        <Box>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedFriendIds.length === Friends.length}
                    color="primary"
                    indeterminate={
                      selectedFriendIds.length > 0
                      && selectedFriendIds.length < Friends.length
                    }
                    onChange={handleSelectAll}
                  /> */}
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
                  selected={selectedFriendIds.indexOf(Friend.id) !== -1}
                >
                <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedFriendIds.indexOf(Friend.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Friend.id)}
                      value="true"
                    /> */}
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
