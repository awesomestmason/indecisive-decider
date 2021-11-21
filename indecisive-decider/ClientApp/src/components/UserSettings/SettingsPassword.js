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

import { updatePasswordCred } from '../../ApiCalls';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,.65)', // transparent
});

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    oldpassword:'',
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onPasswordSubmit = () => {
    updatePasswordCred(values.oldpassword, values.password, values.confirm);
    setValues({oldpassword: '',  password: '', confirm: ''});
  }

  return (
    <form {...props}>
    <RootStyle>
      <CardHeader
        title="Password"
      />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          label="Old password"
          margin="normal"
          name="oldpassword"
          onChange={handleChange}
          type="password"
          value={values.oldpassword}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          onChange={handleChange}
          type="password"
          value={values.password}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Confirm password"
          margin="normal"
          name="confirm"
          onChange={handleChange}
          type="password"
          value={values.confirm}
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
          onClick={onPasswordSubmit}
        >
          Update
        </Button>
      </Box>
    </RootStyle>
  </form>
  );
};

export default SettingsPassword;
