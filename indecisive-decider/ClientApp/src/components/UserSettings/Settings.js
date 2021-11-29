/**
 * Settings.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: 
 * 
 * Description: A container, which has 
 * password settings, avatar settings, 
 * profile settings, these three components.
 */

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
      fontWeight: 'bold',
    },
    button: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold', 
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
