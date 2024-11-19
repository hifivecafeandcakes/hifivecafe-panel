import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';





const MenuCatAdd = () => {
  const [Title, setTitle] = useState('');




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Title) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the Title.',
        position: 'center',
        timer: '3000',
      });
    }

    if (!Image) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the Image.',
        position: 'center',
        timer: '3000',
      });
    }


    console.log('menu_title', Title);

    const formData = new FormData();

    formData.append('menu_title', Title);


    axios
      .post(`${process.env.REACT_APP_API_URL}/menu/category/insert/data`, formData)
      .then(function (res) {
        console.log("RESPONSE :", res.data);
        if (res?.data?.success == '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });
          window.location.href = '/panel/subadmin/MenuCatGet';
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
            <h5>ADD NEW GALLERY CATEGORY</h5>
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
                    label="Category Title"
                    fullWidth
                    margin="normal"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
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

export default MenuCatAdd