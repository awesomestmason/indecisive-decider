import { useEffect, useState } from 'react';
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
import { fetchSendFriendRequest } from '../../ApiCalls';

//TODO text bold

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
  // minWidth: 1050,
});

const SearchFriendsResults = ({ queryResults, removeItem, setIdResults, ...rest }) => {
  const [selectedQueryResultIds, setSelectedQueryResultIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setIdResults([]);
  }, [])

  // const sendBackResults = (results) => {
  //   console.log("SendBack Results: ", results);
  //   setIdResults(results);
  // }

  const handleSelectAll = async(event) => {
    let newSelectedQueryResultIds;

    if (event.target.checked) {
      newSelectedQueryResultIds = queryResults.map((queryResult) => queryResult.id);
    } else {
      newSelectedQueryResultIds = [];
    }

    await setSelectedQueryResultIds(newSelectedQueryResultIds);
    console.log(newSelectedQueryResultIds);
    //sendBackResults(selectedQueryResultIds);
    setIdResults(newSelectedQueryResultIds);
    // TODO bug:
    // no friends, but selected the "select all" checkbox by default
  };

  const handleSelectOne = async(event, id) => { // the id is the user id
    // console.log("Checking out ID: ", id); 
    const selectedIndex = selectedQueryResultIds.indexOf(id);
    let newSelectedQueryResultIds = [];

    if (selectedIndex === -1) {
      newSelectedQueryResultIds = newSelectedQueryResultIds.concat(selectedQueryResultIds, id);
    } else if (selectedIndex === 0) {
      newSelectedQueryResultIds = newSelectedQueryResultIds.concat(selectedQueryResultIds.slice(1));
    } else if (selectedIndex === selectedQueryResultIds.length - 1) {
      newSelectedQueryResultIds = newSelectedQueryResultIds.concat(selectedQueryResultIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedQueryResultIds = newSelectedQueryResultIds.concat(
        selectedQueryResultIds.slice(0, selectedIndex),
        selectedQueryResultIds.slice(selectedIndex + 1)
      );
    }

    await setSelectedQueryResultIds(newSelectedQueryResultIds);
    console.log(newSelectedQueryResultIds);
    //sendBackResults(selectedQueryResultIds);
    setIdResults(newSelectedQueryResultIds);
    // setDelqueryResult("true");
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
                  {/* <Checkbox
                    checked={selectedQueryResultIds.length === queryResults.length}
                    color="primary"
                    indeterminate={
                      selectedQueryResultIds.length > 0
                      && selectedQueryResultIds.length < queryResults.length
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
              {queryResults
                .slice(page * limit, page * limit + limit) // slice page
                  .map((queryResult) => (
                <TableRow
                  hover
                  key={queryResult.id}
                  selected={selectedQueryResultIds.indexOf(queryResult.id) !== -1}
                >
                <TableCell padding="checkbox">
                    {/* <Checkbox
                      //checked={(event) => checkedBox(event, queryResult.id)}
                      checked={(selectedQueryResultIds.indexOf(queryResult.id) !== -1)}
                      onChange={(event) => handleSelectOne(event, queryResult.id)}
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
                        src={queryResult.avatarUrl} //TODO need avatar url api
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
