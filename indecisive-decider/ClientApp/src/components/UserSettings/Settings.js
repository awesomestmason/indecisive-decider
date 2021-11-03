import * as React from 'react';
import { Box, Container, Button} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsPassword from './SettingsPassword';
import SettingsProfile from './SettingsProfile';

const theme = createTheme({
  typography: {
   fontFamily: '"Courier New"',
  }
});

const SettingsView = () => (
  <ThemeProvider theme={theme}>
    <Container 
      maxWidth="sm"
      >
      <SettingsProfile />
      <Box sx={{ pt: 3 }}>
        <SettingsPassword />
      </Box>
      <Box sx={{ pt: 3 }}>
        <Button variant="outlined" color="error">
          Delete Account
        </Button>
      </Box>
    </Container>
  </ThemeProvider>
);

export default SettingsView;
