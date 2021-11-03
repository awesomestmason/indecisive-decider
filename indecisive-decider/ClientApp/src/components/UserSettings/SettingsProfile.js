import * as React from 'react';
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
} from '@mui/material';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,0)',// transparent background
  fontFamily: 'times',
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
            variant="outlined"
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
            variant="outlined"
          >
            Save
          </Button>
        </Box>
      </RootStyle>
    </form>
  );
};

export default SettingsProfile;
