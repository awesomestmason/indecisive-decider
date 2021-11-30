/**
 * SettingsPassword.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: Nathan Lin, Angel Martinez-Portillo, Mason Rylander
 * 
 * Description: This component enables users to 
 * change their passwords
 * 
 * credit: https://material-kit-react.devias.io/
 * 
 * License: MIT License
 */

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

/* 
  SettingsPassword: 
    This component contains MUI-based components imported from the MUI library.
    This will display a box that will have many input textbox that will verify the 
    password change desired and then send it to the database using one of the props.

  Params: props(function/string/int/etc...)
  Returns: A ThemeProvider component that contains the components to display user profile setting changes.
*/
const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    oldpassword:'',
    password: '',
    confirm: ''
  });

  /*
    handleChange:
      Changes the state specified by the event to be whatever was just typed in the specified loation where the  event was generated. 
    Params: the website DOM's event object, which contains the string inside CustomListPopUp's input. 
    Returns: N/A
  */
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  /*
    onPasswordSubmit:
      submits the password that was given in the input boxes that is now confirmed.  
    Params: N/A
    Returns: N/A
  */
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
          // onClick{() => onButtonEdit(id, name, items)}
        >
          Update
        </Button>
      </Box>
    </RootStyle>
  </form>
  );
};

export default SettingsPassword;
