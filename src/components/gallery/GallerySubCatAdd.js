import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';




const GallerySubCatAdd = () => {
  const [Title, setTitle] = useState('');
  const [Image, setImage] = useState(null);
  const [result1, setResult1] = useState([])
  const [SelectedType, setSelectedType] = useState('');
  const [currentpage, setcurrentpage] = useState(1);



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


  // const handleTypeChange = (event) => {
  //   setSelectedType(event.target.value);
  //   setcurrentpage(1);
  //   console.log("TYPE_ID :", event.target.value);
  // };

  const handleTypeChange = (event) => {
    const stringValue = JSON.stringify(event.target.value);
    setSelectedType(stringValue);
    setcurrentpage(1);
    console.log("TYPE_ID :", stringValue);
  };




  useEffect(() => {
    // setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/gallery/category/admin/list`)
      .then((res) => {
        let data = res?.data;


        if (data?.Response.Success == "1") {
          setResult1(data?.Response.result);
          // console.log("result :", data?.Response.result);
        } else {
          Swal.fire({
            customClass: {
              container: 'smaller-swal',
            },
            title: data?.Response.message,
            position: 'center',
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch data. Please contact admin!",
          icon: "error",
          position: 'center',
        });
      })
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!SelectedType) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly select Category.',
        position: 'center',
        timer: '3000',
      });
    }

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

    console.log("SelectedType :", SelectedType);
    console.log("Title :", Title);
    console.log("Image :", Image);

    const formData = new FormData();

    formData.append('gallery_cat_id', SelectedType);
    formData.append('subgallery_title', Title);

    if (Image) {
      formData.append('img', Image);
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/gallery/subcategory/insert/data`, formData)
      .then(function (res) {
        console.log(res.data);
        if (res?.data?.success == '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });
          window.location.href = '/panel/subadmin/GallerySubCatList';
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
            <h5>ADD NEW RESERVATION CATEGORY</h5>
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
                  <InputLabel>Gallery Category</InputLabel>
                  <Select className="bg-light"
                    value={SelectedType}
                    onChange={handleTypeChange}
                    label="Sub-Category"
                  >
                    {result1.map((reservation, index) => (
                      <MenuItem key={index} value={reservation.gallery_id}>
                        {reservation.gallery_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* <FormControl fullWidth>
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
                </FormControl> */}

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
                    className='mt-4'
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

export default GallerySubCatAdd