/**
 * FriendList.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: 
 * 
 * Description: A container, which has 
 * user's friend list, toolbar, pending friend
 * requests, and search friends results
 */

import { Box, Container, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { fetchFriendSearch } from '../../ApiCalls';
import FriendListResults from '../Friends/FriendListResults';
import FriendListToolbar from '../Friends/FriendListToolbar';
import PendingFriendRequest from '../Friends/PendingFriendRequest';
import SearchFriendsResults from './SearchFriendsResults';
import Feed from '../Feed/Feed'

/*
  theme: 
    This sets the MUI styling for the following code.
*/
const theme = createTheme({
  typography: {
   fontFamily: '"Courier New"', // set font
    body1: {
      fontWeight: 'bold',
    },
    button: {
      fontWeight: 'bold',
    },
    root: {
      fontWeight: 'bold',
    },
  }
});

/* 
  onRouteChange 

  function to change route
  route used to tell us where user plans to go

  Params: route, setRoute
  Returns: N/A
*/
function onRouteChange(route, setRoute) {
    setRoute(route);
  }

/**
 * FriendList
 * 
 * Returns: A ThemeProvider component that contains the components to display the 
 * friend list, toolbar, pending friends request, search friends results
 */
const FriendList = () => {
  const [Friends, setFriends] = useState([]);
  const [Requests, setFriendsRequests] = useState([]);
  const [route, setRoute] = useState([]);
  const [queryResults, setQueryResults] = useState([]);

  //sending arrays for checkbox
  const [IdResults, setIdResults] = useState([]);

  const onSearchSubmit = (query) => {
    fetchFriendSearch(query)
      .then(list => {setQueryResults(list)})
  };

  
  useEffect(() => {
    onRouteChange('friendsList', setRoute);
    setQueryResults([]);
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
          {/* Original Tool Bar Placement */}
          <FriendListToolbar 
                      route={route} 
                      onRouteChange={onRouteChange} 
                      setRoute={setRoute} 
                      onSearchSubmit={onSearchSubmit}
                      IdResults={IdResults}
                      Friends={Friends}
                      setFriends={setFriends}
                      Requests={Requests}
                      setFriendsRequests={setFriendsRequests}
                      queryResults={queryResults}
                      setQueryResults={setQueryResults}
                />
          <Grid container spacing={2} sx={{mt: "2vh"}}>
            <Grid item xs={4} sx={{mt: "2.5vh"}}>
                <div style={{overflowX:'hidden'}}>
                <Box>
                  <div className="glow white f1">Feed</div>
                  <Feed />
                </Box>
                </div>
            </Grid>
            
            <Grid item xs={8}>
            <Box sx={{ 
                pt: 3,
                fontWeight: 500,
                }}>
                <div className="glow white f1">Friends</div>
                {route === 'friendsList' &&
                  //<FriendListResults Friends={Friends} setIdResults={setIdResults} removeItem={(id) => {
                  <FriendListResults setIdResults={setIdResults} removeItem={(id) => {
                    console.log(`Removing ${id} from Friends List`)
                    setFriends(Friends.filter(req => req.id !== id));
                  }}/>
                }
                
                {route === 'pendingFriends' &&
                  //<PendingFriendRequest Requests={Requests} setIdResults={setIdResults} removeItem={(id) => {
                  <PendingFriendRequest setIdResults={setIdResults} removeItem={(id) => {
                    console.log(`Removing ${id} from pending requests`)
                    setFriendsRequests(Requests.filter(req => req.id !== id));
                  }}/>
                }

                {route === 'searchFriends' &&
                      
                      <SearchFriendsResults queryResults={queryResults} setIdResults={setIdResults} removeItem={(id) => {
                      console.log(`Removing ${id} from query results`)
                      setQueryResults(queryResults.filter(req => req.id !== id));
                    }}/>

                }
              </Box>  
            </Grid>   
          </Grid>          
          </Container>
        </Box>
        </ThemeProvider>
    </>
  );
}

export default FriendList;
