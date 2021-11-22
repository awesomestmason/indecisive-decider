import * as React from 'react';
import { Box, Container, Button} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsPassword from './SettingsPassword';
import SettingsProfile from './SettingsProfile';
import SettingsPicture from './SettingsPicture';

const theme = createTheme({
  typography: {
   fontFamily: '"Courier New"',
    body1: {
      fontWeight: 'bold', // or 'bold'
      //color: "white"
    },
    button: {
      fontWeight: 'bold', // or 'bold'
      //color: "white"
    },
    h5: {
      fontWeight: 'bold', // or 'bold'
      //color: "white"
    },
  }
});

const SettingsView = () => (
  <ThemeProvider theme={theme}>
    <Container 
      maxWidth="sm"
      >
      <SettingsProfile />
      {/* <SettingsPassword /> */}
      <Box sx={{ pt: 3 }}>
        <SettingsPassword 
          // onButtonEdit
        />
      </Box>

      <Box sx={{ pt: 3 }}>
        <SettingsPicture />
      </Box>

      {/* <Box sx={{ pt: 3 }}>
        <Button variant="contained" color="error">
          Delete Account
        </Button>
        
      </Box> */}
    </Container>
  </ThemeProvider>
);

export default SettingsView;
