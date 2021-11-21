import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,.65)', // transparent
});

const SettingsProfile = (props) => {
  const [values, setValues] = useState({
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
          title="Profile Picture"
        />
        <Divider />
        <CardContent>
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
      </RootStyle>
    </form>
  );
};

export default SettingsProfile;
