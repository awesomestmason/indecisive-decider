import { useState } from 'react';
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

//TODO text bold

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
  minWidth: 1050,
});

const SearchFriendsResults = ({ queryResults, ...rest }) => {
  const [selectedqueryResultIds, setSelectedqueryResultIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedqueryResultIds;

    if (event.target.checked) {
      newSelectedqueryResultIds = queryResults.map((queryResult) => queryResult.id);
    } else {
      newSelectedqueryResultIds = [];
    }

    setSelectedqueryResultIds(newSelectedqueryResultIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedqueryResultIds.indexOf(id);
    let newSelectedqueryResultIds = [];

    if (selectedIndex === -1) {
      newSelectedqueryResultIds = newSelectedqueryResultIds.concat(selectedqueryResultIds, id);
    } else if (selectedIndex === 0) {
      newSelectedqueryResultIds = newSelectedqueryResultIds.concat(selectedqueryResultIds.slice(1));
    } else if (selectedIndex === selectedqueryResultIds.length - 1) {
      newSelectedqueryResultIds = newSelectedqueryResultIds.concat(selectedqueryResultIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedqueryResultIds = newSelectedqueryResultIds.concat(
        selectedqueryResultIds.slice(0, selectedIndex),
        selectedqueryResultIds.slice(selectedIndex + 1)
      );
    }

    setSelectedqueryResultIds(newSelectedqueryResultIds);
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
                  <Checkbox
                    checked={selectedqueryResultIds.length === queryResults.length}
                    color="primary"
                    indeterminate={
                      selectedqueryResultIds.length > 0
                      && selectedqueryResultIds.length < queryResults.length
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
              </TableRow>
            </TableHead>
            <TableBody>
              {queryResults
                .slice(page * limit, page * limit + limit) // slice page
                  .map((queryResult) => (
                <TableRow
                  hover
                  key={queryResult.id}
                  selected={selectedqueryResultIds.indexOf(queryResult.id) !== -1}
                >
                <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedqueryResultIds.indexOf(queryResult.id) !== -1}
                      onChange={(event) => handleSelectOne(event, queryResult.id)}
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
                    {/* <Button
                    color="primary"
                    variant="contained"
                    >
                    Accept Friend
                    </Button>
                    <Button
                    color="error"
                    variant="contained"
                    >
                    Decline Friend
                    </Button> */}
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
