/**
 * FriendListToolbar.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: 
 * 
 * Description: Show page toggle button to toggle 
 * friend list, pending friend requests, and add friends.
 */

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from 'react-feather';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
});

/**
* FriendListToolbar: 
*
* This will display friend list, pending friend requests, 
* and add friends, these toolbars.
*
* Params: route, onRouteChange, setRoute, onSearchSubmit
* Returns: The three buttons that enable route switching
*/
const FriendListToolbar = ({
    route, 
    onRouteChange, 
    setRoute, 
    onSearchSubmit, 
  }) => {

  const [values, setValues] = useState({
    searchField:'',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = () =>{
    onSearchSubmit(values.searchField);
    console.log("values.searchField");
  }

  let returnArray = []; //The combination of all things needed to be added as the toolbar
  //console.log(route);

if(route === "friendsList") {
    returnArray.push(
      <Box >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={true}
          >
            Friend List
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onRouteChange("pendingFriends", setRoute)}
          >
            Pending Friend Requests
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onRouteChange("searchFriends", setRoute)}
          >
            Add Friends
          </Button>
        </Box>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: "2vh",
        }}>
          {/* <Button
              color="error"
              variant="contained"
              onClick={async event => {
                //console.log("Sending friend request to user " + queryResult.id);
                await removeFriends(IdResults, setFriends, Friends);
              }}
            >
              Delete Friend
          </Button> */}
        </Box>
      </Box>
    );
  }

else if(route === "pendingFriends") {
  returnArray.push(
    <Box >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => onRouteChange("friendsList", setRoute)}
        >
          Friend List
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={true}
        >
          Pending Friend Requests
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onRouteChange("searchFriends", setRoute)}
        >
          Add Friends
        </Button>
      </Box>
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: "2vh",
        }}>
          <Button
          sx={{
            margin: "1vh",
            //boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'
          }}
          color="primary"
          onClick={acceptRequests(IdResults, Request)}
          variant="contained"
        >
          Accept Friend
        </Button>
        <Button
        sx={{
          margin: "1vh",
          //boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'
        }}
          color="error"
          onClick={declineRequests(IdResults, Request)}
          variant="contained"
        >
          Decline Friend
        </Button>
        </Box> */}
    </Box>
  );
}

else if(route === "searchFriends") {

  returnArray.push(
    <Box >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => onRouteChange("friendsList", setRoute)}
        >
          Friend List
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onRouteChange("pendingFriends", setRoute)}
        >
          Pending Friend Requests
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={true}
        >
          Add Friends
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: "2vh",
        }}>
          {/* <Button
              color="primary"
              variant="contained"
              onClick={() => makeRequests(IdResults, setQueryResults, queryResults)}
            >
              Send Friend Request
          </Button> */}
        </Box>
    </Box>
  );
}

if(route === "searchFriends"){
  returnArray.push(
    <Box sx={{ mt: 3 }}>
      <RootStyle>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              name='searchField'
              onChange={handleChange}
              values={values.searchField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Friend"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex',
              mt: "2vh",
            }}>
          <Button
              color="primary"
              variant="contained"
              onClick={onSubmit}
            >
              Search Friend
          </Button>
        </Box>
        </CardContent>
      </RootStyle>
    </Box>);
}

return returnArray;

}

export default FriendListToolbar;
