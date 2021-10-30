import { Box, Container } from '@material-ui/core';
// import SettingsNotifications from './SettingsNotifications';
import SettingsPassword from './SettingsPassword';
import SettingsProfile from './SettingsProfile';
const SettingsView = () => (
  <>
    {/* <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    > */}
      <Container 
        maxWidth="sm"
        >
        <SettingsProfile />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    {/* </Box> */}
  </>
);

export default SettingsView;
