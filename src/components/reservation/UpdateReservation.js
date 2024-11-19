import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';


const UpdateReservation = () => {

  const resID = localStorage.getItem("res_id");
  
  // const [resID, setResID] = useState(localStorage.getItem("res_id"));
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const onImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type for image!',
        position: 'center',
      });
    }
  };


  const onImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
    // if (files.length > 3) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: "You can't select more than 3 images for 'Extra Image'!",
    //     position: 'center',
    //   });
    // } 


    // const fileNames = [];
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   fileNames.push(file.name);
    //   if (!file.type.startsWith('image/')) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Invalid file type for image!',
    //       position: 'center',
    //     });
    //     return;
    //   }
    // }

    // Set selected image file names

  };





  const handleSubmit = (e) => {
    e.preventDefault();


    console.log('reser_id', resID);
    console.log('reser_title', Title);
    console.log('description', Description);
    console.log('reser_img', Image);
    console.log('img', selectedImages);


    const formData = new FormData();
    formData.append('reser_id', resID);
    formData.append('reser_title', Title);
    formData.append('description', Description);

    if (Image) {
      formData.append('reser_image', Image);
    }

    if (selectedImages && selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('img', selectedImages[i]);
      }
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/reservation/update/api`, formData)
      .then(function (res) {
        console.log(res.data);
        if (res?.data?.success === '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });
          window.location.href = '/panel/subadmin/ListReservation';
        } else if (res.data.Message === 'Give Valid Id') {
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
            <h5>UPDATE RESERVATION</h5>
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
                marginTop: '1%',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)',
                border: 'solid 1px #ffc107',
                paddingTop: '3vh',
                paddingBottom: '3vh',
                marginTop: '10vh',
              }}
            >
              <CardContent className="mx-3">
                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextareaAutosize
                    minRows={3}
                    aria-label="minimum height"
                    placeholder="Description"
                    style={{ width: '100%' }}
                    className="mt-2"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
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

                <FormControl fullWidth>
                  <TextField
                    label="Extra Image"

                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <input type="file" multiple accept="image/*" onChange={onImageChange} style={{ display: 'none' }} id="icon-button-file1" />
                          <label htmlFor="icon-button-file1">
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

export default UpdateReservation;
