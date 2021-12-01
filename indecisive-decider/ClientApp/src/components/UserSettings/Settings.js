/**
 * Settings.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: Nathan Lin, Angel Martinez-Portillo, Mason Rylander
 * 
 * Description: A container, which has 
 * password settings, avatar settings, 
 * profile settings, these three components.
 * 
 * credit: https://material-kit-react.devias.io/
 * 
 * License: MIT License
 */

import * as React from 'react';
import { Box, Container} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SettingsPassword from './SettingsPassword';
import SettingsProfile from './SettingsProfile';
import SettingsPicture from './SettingsPicture';

/*
  theme: 
    This sets the MUI styling for the following code.
*/
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

/**
* SettingsView: 
*
* This component contains MUI-based components imported from the MUI library and
* components imported from SettingsPassword.js, SettingsPicture.js, and SettingsProfile.js.
* This will display three components that all focus on user profile changes.
*
* Params: N/A
* Returns: A ThemeProvider component that contains the components to display user profile setting changes.
*/
const SettingsView = ({loadUser}) => (
  <ThemeProvider theme={theme}>
    <Container 
      maxWidth="sm"
      >
      <SettingsProfile loadUser={loadUser}/>
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
