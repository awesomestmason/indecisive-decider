import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography, Button,

} from '@mui/material';
import getInitials from './getInitials';
import { fetchAcceptFriend, fetchDeclineFriend } from '../../ApiCalls';

//TODO text bold

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
  // minWidth: 1050,
});

const PendingFriendRequest = ({ Requests, removeItem, setIdResults, ...rest }) => {
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setIdResults([]);
  }, [])

  const handleSelectAll = (event) => {
    let newSelectedRequestIds;

    if (event.target.checked) {
      newSelectedRequestIds = Requests.map((Request) => Request.id);
    } else {
      newSelectedRequestIds = [];
    }

    setSelectedRequestIds(newSelectedRequestIds);
    setIdResults(newSelectedRequestIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRequestIds.indexOf(id);
    let newSelectedRequestIds = [];

    if (selectedIndex === -1) {
      newSelectedRequestIds = newSelectedRequestIds.concat(selectedRequestIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRequestIds = newSelectedRequestIds.concat(selectedRequestIds.slice(1));
    } else if (selectedIndex === selectedRequestIds.length - 1) {
      newSelectedRequestIds = newSelectedRequestIds.concat(selectedRequestIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRequestIds = newSelectedRequestIds.concat(
        selectedRequestIds.slice(0, selectedIndex),
        selectedRequestIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRequestIds(newSelectedRequestIds);
    setIdResults(newSelectedRequestIds);
    // setDelRequest("true");
  };

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
              <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRequestIds.length === Requests.length}
                    color="primary"
                    indeterminate={
                      selectedRequestIds.length > 0
                      && selectedRequestIds.length < Requests.length
                    }
                    onChange={handleSelectAll}
                  />
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
                  selected={selectedRequestIds.indexOf(Request.id) !== -1}
                >
                <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRequestIds.indexOf(Request.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Request.id)}
                      value="true"
                    />
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
