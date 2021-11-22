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

import { updateCred } from '../../ApiCalls';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,.65)', // transparent
});

const SettingsProfile = (props) => {
  const [values, setValues] = useState({
    name:'',
    email: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onCredSubmit = () => {
    updateCred(values.name, values.email);
    setValues({name:'', email: ''});
  }

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
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="E-mail"
            margin="normal"
            name="email"
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
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
            onClick={onCredSubmit}
          >
            Save
          </Button>
        </Box>
      </RootStyle>
    </form>
  );
};

export default SettingsProfile;
