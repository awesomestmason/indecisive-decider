import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  Typography
} from '@mui/material';
import getInitials from './getInitials';

//TODO transparent UI
//TODO change page

// import {
//   // Box,
//   Button,
//   // Card,
//   CardContent,
//   TextField,
//   InputAdornment,
//   SvgIcon
// } from '@mui/material';
// import { Search as SearchIcon } from 'react-feather';

// const FriendListToolbar = (props) => (
//   <Box {...props}>
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'flex-end'
//       }}
//     >
//       <Button
//         color="primary"
//         variant="contained"
//       >
//         Add Friend
//       </Button>
//       <Button
//         color="error"
//         variant="contained"
//       >
//         Delete Friend
//       </Button>
//     </Box>
//     <Box sx={{ mt: 3 }}>
//       <Card>
//         <CardContent>
//           <Box sx={{ maxWidth: 500 }}>
//             <TextField
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SvgIcon
//                       fontSize="small"
//                       color="action"
//                     >
//                       <SearchIcon />
//                     </SvgIcon>
//                   </InputAdornment>
//                 )
//               }}
//               placeholder="Search Friend"
//               variant="outlined"
//             />
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   </Box>
// );

const FriendListResults = ({ Friends, ...rest }) => {
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      {/* <FriendListToolbar /> */}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFriendIds.length === Friends.length}
                    color="primary"
                    indeterminate={
                      selectedFriendIds.length > 0
                      && selectedFriendIds.length < Friends.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Friends.slice(0, limit).map((Friend) => (
                <TableRow
                  hover
                  key={Friend.id}
                  selected={selectedFriendIds.indexOf(Friend.id) !== -1}
                >
                <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFriendIds.indexOf(Friend.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Friend.id)}
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
                        src={Friend.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(Friend.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {Friend.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {Friend.email}
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
    </Card>
  );
};

FriendListResults.propTypes = {
  Friends: PropTypes.array.isRequired
};

export default FriendListResults;
