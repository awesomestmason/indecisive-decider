/**
 * FriendList.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: Angel Martinez, Nathan Lin, Mason Rylander
 * 
 * Description: A container, which has 
 * user's friend list, toolbar, pending friend
 * requests, and search friends results
 * 
 * credit: https://material-kit-react.devias.io/
 * 
 * License: MIT License
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

  /*
    onSearchSubmit:
      This function sends a query to the back-end which returns
         a response with the list of users that match the query.
         list of users is then saved into queryResults.
    Params: query which is a string.
    Returns: N/A
  */
  const onSearchSubmit = (query) => {
    fetchFriendSearch(query)
      .then(list => {setQueryResults(list)})
  };

  /*
    useEffect:
      This function can be used when the function component gets called. In this
      instance, it only activates once per load, and it will change the "route" state
      to 'friendsList'.
    Params: N/A
    Returns: N/A
  */
  useEffect(() => {
    onRouteChange('friendsList', setRoute);
    setQueryResults([]);
  }, [])


  /*
    This section here acts like a mini-App.js. Just like in App.js we have
      multiple "components" which come together to create the full friends page.
  */
  return [
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
          {route === 'friendsList' &&
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
                      <FriendListResults setIdResults={setIdResults} removeItem={(id) => {
                        console.log(`Removing ${id} from Friends List`)
                        setFriends(Friends.filter(req => req.id !== id));
                      }}/>
                  </Box>  
              </Grid>   
            </Grid>   
          }

          {route === 'pendingFriends' &&
            <div>
              <div className="glow white f1">Pending Friends</div>
              <PendingFriendRequest style={{margin: "2vh"}} setIdResults={setIdResults} removeItem={(id) => {
                console.log(`Removing ${id} from pending requests`)
                setFriendsRequests(Requests.filter(req => req.id !== id));
              }}/>
            </div>
          }

          {route === 'searchFriends' &&
              <div>
                <SearchFriendsResults style={{margin: "2vh"}} queryResults={queryResults} setIdResults={setIdResults} removeItem={(id) => {
                console.log(`Removing ${id} from query results`)
                setQueryResults(queryResults.filter(req => req.id !== id));
                }}/>
              </div>

          }          
          </Container>
        </Box>
        </ThemeProvider>
    </>
  ];
}

export default FriendList;
