import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { InputLabel, Select, MenuItem, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';


const VideoUpdate = () => {

  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [Image, setImage] = useState('');
  const [status, setStatus] = useState('');


  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedType = localStorage.getItem('type');
    const storedVideo = localStorage.getItem('video');
    const storedStatus = localStorage.getItem('status');

    console.log("id :", storedId);
    console.log("type :", storedType);
    console.log("video :", storedVideo);
    console.log("videostatus :", storedStatus);

    setId(storedId);
    setType(storedType);
    setImage(storedVideo);
    setStatus(storedStatus);
  }, []);



  const onImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setImage(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type for Video!',
        position: 'center',
      });
    }
  };


  const handleType = (event) => {
    const selectedValue = event.target.value;
    setType(selectedValue);
    console.log("TYPE :", selectedValue);
  }


  const handleStatus = (event) => {
    const selectedValue = event.target.value;
    setStatus(selectedValue);
    console.log("Status :", selectedValue);
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!Image) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the Video.',
        position: 'center',
        timer: '3000',
      });
      return; // Added return to prevent further execution
    }


    const formData = new FormData();
    formData.append('id', id);
    formData.append('type', type);
    formData.append('status', status);

    if (Image) {
      formData.append('video', Image);
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/updateVideo`, formData)
      .then(function (res) {
        console.log("RESPONSE :", res.data);
        if (res?.data?.Response?.Success == '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });
          window.location.href = '/panel/subadmin/VideoGet';
        } else if (res.data.message == 'Give Valid Id') {
          alert('Give Valid Id');
        } else {
          console.log('execution error');
        }
      })
      .catch((error) => {
        console.error('fetching error:', error);
      });
  };

  return (
    <>
      <div
        className="content-wrapper Dashboard1-content"
        style={{
          background: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#fff',
        }}
      >
        <div className="row">
          <div className="col-lg-12 p-3 bg-warning card-header">
            <h5>ADD NEW VIDEO</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Card
              style={{
                width: '90%',
                paddingLeft: '2%',
                paddingRight: '2%',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)',
                border: 'solid 1px #ffc107',
                paddingTop: '3vh',
                paddingBottom: '3vh',
                marginTop: '5vh',
              }}
            >
              <CardContent className="mx-3">

                <FormControl fullWidth variant="outlined">
                  <InputLabel>{type ? (type === 'H' ? 'HOME' : 'RESERVATION') : 'Select the Type'}</InputLabel>
                  <Select className="bg-light"
                    value={type}
                    onChange={handleType}
                    label="Type"
                  >
                    <MenuItem value="H">HOME</MenuItem>
                    <MenuItem value="R">RESERVATION</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" className='mt-4'>
                  <InputLabel>{status ? (status == '1' ? 'Active' : 'Inactive') : 'Select the Status'}</InputLabel>
                  <Select className="bg-light"
                    value={status}
                    onChange={handleStatus}
                    label="Type"
                  >
                    <MenuItem value="0">Inactive</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                  </Select>
                </FormControl>


                <FormControl fullWidth className='mt-2'>
                  <TextField
                    label="Image"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="icon-button-file"
                            onChange={onImageChange1}
                          />
                          <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                              <AttachFileIcon />
                            </IconButton>
                          </label>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </CardContent>

              <CardActions className="px-4">
                <Button
                  style={{ backgroundColor: '#023678', marginTop: '-1.5vh' }}
                  variant="contained"
                  className="text-light mb-3 mx-2"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  );
};

export default VideoUpdate;
