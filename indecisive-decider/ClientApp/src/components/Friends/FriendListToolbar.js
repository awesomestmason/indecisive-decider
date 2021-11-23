import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from 'react-feather';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
  minWidth: 1050,
});

const FriendListToolbar = ({route, onRouteChange, setRoute}) => {
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
          {/* <Button
            color="primary"
            variant="contained"
          >
            Add Friend
          </Button> */}
          {/* <Button
            color="error"
            variant="contained"
          >
            Delete Friend
          </Button> */}
        </Box>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: "2vh",
        }}>
          <Button
              color="error"
              variant="contained"
            >
              Delete Friend
          </Button>
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
        {/* <Button
          color="primary"
          variant="contained"
        >
          Add Friend
        </Button>
        <Button
          color="error"
          variant="contained"
        >
          Delete Friend
        </Button> */}
      </Box>
      <Box
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
          color="success"
          
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
          variant="contained"
        >
          Decline Friend
        </Button>
        </Box>
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
        {/* <Button
          color="primary"
          variant="contained"
        >
          Add Friend
        </Button>
        <Button
          color="error"
          variant="contained"
        >
          Delete Friend
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
        </CardContent>
      </RootStyle>
    </Box>);
}

return returnArray;

}

export default FriendListToolbar;
