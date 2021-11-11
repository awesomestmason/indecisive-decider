import { Box, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FriendListResults from '../Friends/FriendListResults';
import FriendListToolbar from '../Friends/FriendListToolbar';
import Friends from '../Friends/friends';

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

const FriendList = () => (
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
        <FriendListToolbar />
        <Box sx={{ 
          pt: 3,
          fontWeight: 500,
          }}>
          <FriendListResults Friends={Friends} />
        </Box>
      </Container>
    </Box>
    </ThemeProvider>
  </>
);

export default FriendList;
