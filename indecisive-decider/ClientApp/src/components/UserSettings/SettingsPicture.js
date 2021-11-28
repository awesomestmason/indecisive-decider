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

const RootStyle = styled(Card)({
  boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )', // shadow-5
  backgroundColor: 'rgba(255,255,255,.65)', // transparent
});

//Source: https://flaviocopes.com/how-to-upload-files-fetch/
function handleImageUpload (event) {
  const file = event.target.files[0]
  const formData = new FormData()

  // check file type
  //if(!['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(file.type)) {
  if(!['image/png'].includes(file.type)) {
    //console.log('Only images are allowed.');
    console.log('Only PNGs are allowed.');
    return;
  }

  // check file size (< 2MB)
  if(file.size > 2 * 1024 * 1024) {
    console.log('File must be less than 2MB.');
    return;
  }

  //File is fine, so append into formData:
  formData.append('myFile', file);
  return fetchImageUpload(formData);

}

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
                Upload PNG
            <input
                type="file"
                onChange={async event => {
                  setUploading(false);
                  await handleImageUpload(event).then(e => setUploading(false));
                }
                }
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
