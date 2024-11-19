import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';




const CakeSubCatAdd = () => {
  const [SelectedType, setSelectedType] = useState('');
  const [type, setType] = useState('C');
  const [Title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState('');


  const [Image, setImage] = useState(null);
  const [result1, setResult1] = useState([])

  const [currentpage, setcurrentpage] = useState(1);

  useEffect(() => {
    // setLoading(true);
    // axios.get(`${process.env.REACT_APP_API_URL}/menu/category/get/list`)
    axios.get(`${process.env.REACT_APP_API_URL}/cake/category/get/list`)
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

  console.log("DATA TTTT:", result1);

  const handleTypeChange = (event) => {
    const stringValue = JSON.stringify(event.target.value);
    setSelectedType(stringValue);
    setcurrentpage(1);
    console.log("TYPE_ID :", stringValue);
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


    console.log('menu_catid', SelectedType);
    console.log('menu_type', type);
    console.log('menu_titile', Title);
    console.log('menu_price', price);
    console.log('menu_description', description);
    console.log('discount', discount);
    console.log('final_price', finalPrice);
    console.log('item_img', Image);

    const formData = new FormData();

    formData.append('menu_catid', SelectedType);
    formData.append('menu_type', type);
    formData.append('menu_titile', Title);
    formData.append('menu_price', price);
    formData.append('menu_description', description);
    formData.append('discount', discount);
    formData.append('final_price', finalPrice);

    if (Image) {
      formData.append('item_img', Image);
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/cake/subcategory/add`, formData)
      .then(function (res) {
        console.log("RESPONSE :", res.data);
        if (res?.data?.Response?.Success == '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });
          window.location.href = '/panel/subadmin/CakeSubCatGet';
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

                <FormControl fullWidth variant="outlined">
                  <InputLabel>Select Category</InputLabel>
                  <Select className="bg-light"
                    value={SelectedType}
                    onChange={handleTypeChange}
                    label="Sub-Category"
                  >
                    {result1?.map((menu, index) => (
                      <MenuItem key={index} value={menu.cake_id}>
                        {menu.cake_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Menu Title"
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
                    label="Price"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>


                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>


                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Discount"
                    fullWidth
                    margin="normal"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </FormControl>


                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Final Price"
                    fullWidth
                    margin="normal"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
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

export default CakeSubCatAdd