import { useState } from 'react';
import { makeStyles } from '@mui/styles';
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
            name="old password"
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
          >
            Update
          </Button>
        </Box>
      </RootStyle>
    </form>
  );
};

export default SettingsPassword;
