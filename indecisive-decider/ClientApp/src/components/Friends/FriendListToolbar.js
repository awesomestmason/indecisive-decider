import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from 'react-feather';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
<<<<<<< HEAD
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
=======
  backgroundColor: 'rgba(255,255,255,0.65)', // transparent
>>>>>>> c6265a6162d95f086c689fa2b490bbe4c68b005d
  minWidth: 1050,
});

const FriendListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
      >
        Add Friend
      </Button>
      <Button
        color="error"
        variant="contained"
        disabled="false" // TODO click checkbox -> true
      >
        Delete Friend
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <RootStyle>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Friend"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </RootStyle>
    </Box>
  </Box>
);

export default FriendListToolbar;
