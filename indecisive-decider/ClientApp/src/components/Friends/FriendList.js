import { Box, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { fetchFriends, fetchFriendRequests } from '../../ApiCalls';
import FriendListResults from '../Friends/FriendListResults';
import FriendListToolbar from '../Friends/FriendListToolbar';
import PendingFriendRequest from '../Friends/PendingFriendRequest';
import SearchFriendsResults from './SearchFriendsResults';
//import Friends from '../Friends/friends';

//TODO get friend list from backend by API

const theme = createTheme({
  typography: {
   fontFamily: '"Courier New"', // set font
    body1: {
      fontWeight: 'bold', // or 'bold'
    },
    button: {
      fontWeight: 'bold', // or 'bold'
    },
    root: {
      fontWeight: 'bold', // or 'bold'
    },
  }
});

// function to chnage route
// route used to tell us where user plans to go
function onRouteChange(route, setRoute) {
    setRoute(route);
  }

const FriendList = () => {
  //js code here
  //const route = useState('searchFriends');
  const [Friends, setFriends] = useState([]);
  const [Requests, setFriendsRequests] = useState([]);
  const [route, setRoute] = useState([]);

  

  useEffect(() => {

    // setRoute('friendsList');
    onRouteChange('friendsList', setRoute);

    fetchFriends().then(list => {
      //console.log(list)
      setFriends(list)
    });

    fetchFriendRequests().then(list => {
      setFriendsRequests(list);
    });
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: 'rgba(255,255,255,0)',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <FriendListToolbar route={route} onRouteChange={onRouteChange} setRoute={setRoute}/>
            <Box sx={{ 
              pt: 3,
              fontWeight: 500,
              }}>

              {route === 'friendsList' &&
                <FriendListResults Friends={Friends}/>
              }
              
              {route === 'pendingFriends' &&
                <PendingFriendRequest Requests={Requests}/>
              }

              {route === 'searchFriends' &&
                <SearchFriendsResults Requests={Requests}/>
              }
              

            </Box>
          </Container>
        </Box>
        </ThemeProvider>
    </>
  );
}

export default FriendList;
