import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';



const ResCatUpdate = () => {
  const resID = localStorage.getItem("res_cat_id");

  const [ID, setID] = useState(resID);
  const [Title, setTitle] = useState('');
  const [range, setRange] = useState('');
  const [Image, setImage] = useState(null);
 


  const handleIDChange = (e) => {
    const input = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(input) || input === '') {
      setID(input);
    }
  };

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


  const handleSubmit = (e) => {
    e.preventDefault();



    console.log('reser_cat_id', ID);
    console.log('cat_title', Title);
    console.log('price_range', range);
    console.log('cat_image', Image);

    const formData = new FormData();

    formData.append('reser_cat_id', ID);
    formData.append('cat_title', Title);
    formData.append('price_range', range);

    if (Image) {
      formData.append('cat_image', Image);
    }


    axios
      .post(`${process.env.REACT_APP_API_URL}/reservation/category/update/api`, formData)
      .then(function (res) {
        console.log(res.data);
        if (res?.data?.success == '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });
          window.location.href = '/panel/subadmin/ResCatGet';
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
            <h5>RESERVATION CATEGORY UPDATE</h5>
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
                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Reservation Id"
                    fullWidth
                    margin="normal"
                    value={ID}
                    onChange={handleIDChange}
                  />
                </FormControl>

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
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Price Range"
                    fullWidth
                    margin="normal"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
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
  )
}

export default ResCatUpdate