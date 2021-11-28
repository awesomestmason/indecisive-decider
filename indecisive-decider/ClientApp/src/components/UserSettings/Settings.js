import * as React from 'react';
import { Box, Container} from '@mui/material';
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
      <Box sx={{ pt: 3 }}>
        <SettingsPassword 
        />
      </Box>

      <Box sx={{ pt: 3 }}>
        <SettingsPicture />
      </Box>

    </Container>
  </ThemeProvider>
);

export default SettingsView;
