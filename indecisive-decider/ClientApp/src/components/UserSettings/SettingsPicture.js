/**
 * SettingsPicture.js
 * - Main Authors: Qiance Yu
 * - Supporting Authors: Nathan Lin, Angel Martinez-Portillo, Mason Rylander
 * 
 * Description: This component enables
 * users to modify their avatars.
 * 
 * credit: https://material-kit-react.devias.io/
 * 
 * License: MIT License
 */

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

import { fetchImageUpload } from '../../ApiCalls';

/* 
  RootStyle:
    Used to style the Card Component to the styles specified.
*/
const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,.65)', // transparent
});

/* 
  handleImageUpload:
    used for uploading a file given by the user through the event action, which will then use the 
    imported function as the return statement to send the image to the database and set the user's 
    profile picture in Logo.js as such. 
  Params: the website DOM's event object, which contains the files we want to upload using fetchImageUpload. 
  Returns: fetchImageUpload(formData), which is from ApiCalls.   

  Acknowledgements: For the following logic with the event.target.files[...] https://flaviocopes.com/how-to-upload-files-fetch/
*/
function handleImageUpload (event) {
  const file = event.target.files[0];
  console.log(file);
  const formData = new FormData();

  // check file size (< 2MB)
  if(file.size > 2 * 1024 * 1024) {
    console.log('File must be less than 2MB.');
    //formData.append('myFile', '');
    //return fetchImageUpload(formData);
  }

  
  //File is fine, so append into formData:
  formData.append('myFile', file);
  return fetchImageUpload(formData);
  
  
}

/* 
  SettingsProfile: 
    This component contains MUI-based components imported from the MUI library.
    This will display a box that will have a button for the profile change desired and
    then send it to the database using one of the props.

  Params: props(function/string/int/etc...)
  Returns: A form tag that contains text and a button that can set a new profile picture. 
*/
const SettingsProfile = (props) => {
  const [uploading, setUploading] = useState(false);

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
                disabled={uploading}
                onClick={() => {setUploading(true);} }
            >
                Upload Image
            <input
                type="file"
                onChange={async event => {
                  //Errors when fed incorrect file types and 
                  setUploading(false);
                  await handleImageUpload(event)
                  .then(e => setUploading(false));
                }}
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
