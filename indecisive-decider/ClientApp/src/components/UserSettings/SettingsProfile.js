import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

const RootStyle = styled(Card)({
  // boxShadow: '10px 5px 5px',
  backgroundColor: 'rgba(255,255,255,0.1)'
});

const SettingsProfile = (props) => {
  const [values, setValues] = useState({
    name:'',
    email: '',
    pic: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <RootStyle>
        <CardHeader
          title="Profile"
        />
        <Divider />
        <CardContent>
        <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="Name"
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="E-mail"
            margin="normal"
            name="E-mail"
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <p>Profile Pic</p>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
          <input
            type="file"
            hidden
          />
          </Button>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </RootStyle>
    </form>
  );
};

export default SettingsProfile;
