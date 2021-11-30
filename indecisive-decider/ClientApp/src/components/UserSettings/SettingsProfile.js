/**
 * SettingsProfile.js
 * - Main Author: Qiance Yu
 * - Supporting Authors: 
 * 
 * Description: This component enables the 
 * users to modify profile, 
 * such as email address or username.
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

import { updateCred } from '../../ApiCalls';

/* 
  RootStyle:
    Used to style the Card Component to the styles specified.
*/
const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,.65)', // transparent
});
/* 
  SettingsProfile: 
    This component contains MUI-based components imported from the MUI library.
    This will display a box that will have many input textbox that will verify the 
    name and email change desired and then send it to the database using one of the props.

  Params: props(function/string/int/etc...)
  Returns: A form tag that contains the input boxes that can change the user's Name and Email.
*/
const SettingsProfile = (props) => {
  const [values, setValues] = useState({
    name:'',
    email: '',
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
    onCredSubmit:
      submits the name and email that was given in the input boxes that is now confirmed, and uses imported
      function called updateCred(...) to set the new name and/or email in the backend.  
    Params: N/A
    Returns: N/A
  */
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
