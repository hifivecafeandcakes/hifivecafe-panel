import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';
import Box from "@mui/material/Box";


const ResSubCatPost = () => {



  const [Title, setTitle] = useState('');
  const [range, setRange] = useState('');
  const [Image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [CatID, setCatID] = useState('');
  const [ID, setID] = useState('');
  const [reservation, setReservation] = useState([])
  const [result1, setResult1] = useState([])
  const [result2, setResult2] = useState([])
  const [currentpage, setcurrentpage] = useState(1);

  const [selectedVegImages, setSelectedVegImages] = useState([]);
  const [selectedNonVegImages, setSelectedNonVegImages] = useState([]);


  const [vegmenus, setVegmenus] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [nonvegmenus, setNonvegmenus] = useState(["", "", "", "", "", "", "", "", "", ""]);


  //candle and birthday
  const [cakes, setCakes] = useState(["", "", "", "", "", "", "", "", "", ""]);

  //birthday only
  const [photoPrints, setPhotoPrints] = useState(["", "", "", "", ""]);
  const [photoPrintPrices, setphotoPrintPrices] = useState(["", "", "", "", ""]);

  const [flowers, setFlowers] = useState(["", "", "", "", ""]);
  const [flowersPrices, setFlowersPrices] = useState(["", "", "", "", ""]);

  const [photoShoots, setPhotoShoots] = useState(["", "", "", "", ""]);
  const [photoShootPrices, setPhotoShootPrices] = useState(["", "", "", "", ""]);


  const [reservationType, setReservationType] = useState(1); //1 candle, 2 birthday, 3 table booking


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
    console.log(e.target.files);
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



  const onVegImageChange = (e) => {
    const files = e.target.files;
    console.log(e.target.files);
    setSelectedVegImages(files);
  }
  const onNonVegImageChange = (e) => {
    const files = e.target.files;
    console.log(e.target.files);
    setSelectedNonVegImages(files);
  }


  function setMenu(newValue, field, index) {

    if (field == "veg") {
      let updatedArray1 = vegmenus.map((item, i) => (i === index ? newValue : item));
      setVegmenus(updatedArray1);
    } else {
      let updatedArray2 = nonvegmenus.map((item, i) => (i === index ? newValue : item));
      setNonvegmenus(updatedArray2);
    }
  }


  function changeMenu(newValue, field, index) {
    let updatedArray1 = cakes.map((item, i) => (i === index ? newValue : item));
    setCakes(updatedArray1);
  }

  function changePhotoPrints(newValue, field, index) {
    let updatedArray1 = photoPrints.map((item, i) => (i === index ? newValue : item));
    setPhotoPrints(updatedArray1);
  }

  function changeFlowers(newValue, field, index) {
    let updatedArray1 = flowers.map((item, i) => (i === index ? newValue : item));
    setFlowers(updatedArray1);
  }

  function changeFlowers(newValue, field, index) {
    let updatedArray1 = flowers.map((item, i) => (i === index ? newValue : item));
    setFlowers(updatedArray1);
  }

  function changeFlowersPrices(newValue, field, index) {
    let updatedArray1 = flowersPrices.map((item, i) => (i === index ? newValue : item));
    setFlowersPrices(updatedArray1);
  }

  function changePhotoShoots(newValue, field, index) {
    let updatedArray1 = photoShoots.map((item, i) => (i === index ? newValue : item));
    setPhotoShoots(updatedArray1);
  }

  function changePhotoShootPrices(newValue, field, index) {
    let updatedArray1 = photoShootPrices.map((item, i) => (i === index ? newValue : item));
    setPhotoShootPrices(updatedArray1);
  }


  useEffect(() => {
    // setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/reservation/overall/list`)
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
      })
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ID) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly select the reservation type.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (!CatID) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly select the reservation category.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (!Title) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the Title.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (!range) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the price range.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (!Image) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the image.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (!selectedImages) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the extra image.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    console.log(selectedVegImages);
    if (selectedVegImages && selectedVegImages.length <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the Veg menu image.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (selectedNonVegImages && selectedNonVegImages.length <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide the non veg image.',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (vegmenus[0] == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide One veg menu',
        position: 'center',
        timer: '3000',
      });
      return;
    }

    if (nonvegmenus[0] == "") {
      Swal.fire({
        icon: 'warning',
        title: 'Kindly provide One non-veg menu',
        position: 'center',
        timer: '3000',
      });
      return;
    }


    console.log('id', ID);
    console.log('cat_id', CatID);
    console.log('title', Title);
    console.log('range', range);
    console.log('image', Image);
    console.log('Extra_image', selectedImages);
    console.log('veg_image', selectedVegImages);
    console.log('nonveg_image', selectedNonVegImages);

    const formData = new FormData();

    formData.append('reser_id', ID);
    formData.append('reser_cat_id', CatID);
    formData.append('sub_tilte', Title);
    formData.append('sub_cat_price_range', range);

    if (Image) {
      formData.append('sub_img', Image);
    }

    if (selectedImages && selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('img', selectedImages[i]);
      }
    }

    if (vegmenus && vegmenus.length > 0) {
      for (let i = 0; i < vegmenus.length; i++) {
        formData.append('veg_menus', vegmenus[i]);
      }
    }

    if (selectedVegImages && selectedVegImages.length > 0) {
      for (let i = 0; i < selectedVegImages.length; i++) {
        formData.append('veg_images', selectedVegImages[i]);
      }
    }

    if (nonvegmenus && nonvegmenus.length > 0) {
      for (let i = 0; i < nonvegmenus.length; i++) {
        formData.append('nonveg_menus', nonvegmenus[i]);
      }
    }

    if (selectedNonVegImages && selectedNonVegImages.length > 0) {
      for (let i = 0; i < selectedNonVegImages.length; i++) {
        formData.append('nonveg_images', selectedNonVegImages[i]);
      }
    }

    if (cakes && cakes.length > 0) {
      for (let i = 0; i < cakes.length; i++) {
        formData.append('cakes', cakes[i]);
      }
    }


    axios
      .post(`${process.env.REACT_APP_API_URL}/reservation/subcategory/insert/data`, formData)
      .then(function (res) {
        console.log(res.data);
        if (res?.data?.success == '1') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated!.',
            position: 'center',
            timer: '3000',
          });

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

  const handleCatChange = (event) => {
    const resID = event.target.value;
    setCatID(resID);
    console.log("Cat_ID :", resID);
  }



  const handleTypeChange = (event) => {
    const resID = event.target.value;

    setID(resID);
    console.log("RES_TYPE :", event.target.value);

    setReservationType(resID)

    axios.get(`${process.env.REACT_APP_API_URL}/reservation/category/get/list?reser_id=${resID}`)
      .then((res) => {
        let data = res?.data;
        // console.log("data ::", data  );
        if (data?.Response?.Success == "1") {
          const data1 = data?.Response?.result[0]?.reservation_category_list;
          setResult2(data1);

          // console.log("result_1 :", data1.map((item) => item.cat_title));

          // data?.Response?.result.forEach((reservation) => {
          //   reservation.reservation_category_ilst.forEach((category) => {
          //     console.log("Category Name:", category.cat_title);
          //   });
          // });

        } else {
          console.log("cat data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
  };


  // console.log("Cat :", result1);



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
            <h5>ADD NEW RESERVATION SUB CATEGORY</h5>
          </div>
        </div>

        <div className="row">
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
                  <InputLabel>Reservation Type</InputLabel>
                  <Select className="bg-light"
                    value={ID}
                    onChange={handleTypeChange}
                    label="Sub-Category"
                  >
                    {result1?.map((reservation, index) => (
                      <MenuItem key={index} value={reservation.reser_id}>
                        {reservation.reser_main_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <FormControl fullWidth variant="outlined" className='mt-4'>
                  <InputLabel>Category Type</InputLabel>
                  <Select className="bg-light"
                    // value={SelectedType}
                    onChange={handleCatChange}
                    label="Sub-Category"
                  >
                    {result2?.map((category, index) => (
                      <MenuItem key={category.cat_id} value={category.cat_id}>
                        {category.cat_title}
                      </MenuItem>
                    ))}
                  </Select>
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

              {(reservationType == 2) ?

                <CardContent>
                  <Box component="fieldset">
                    <legend>Flower Bouquet</legend>
                    {flowers?.map((val, index) => (

                      <FormControl key={index} style={{ width: '50%' }}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label={`Flower Bouquet-${index + 1}`}
                          margin="normal"
                          halfWidth
                          value={val}
                          style={{ width: '95%' }}
                          onChange={(e) => changeFlowers(e.target.value, "flower", index)}
                        />
                      </FormControl>
                    ))}
                  </Box>

                  <Box component="fieldset">
                    <legend>Flower Bouquet Price</legend>
                    {flowersPrices?.map((val, index) => (

                      <FormControl key={index} style={{ width: '50%' }}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label={`Flower Bouquet Price-${index + 1}`}
                          margin="normal"
                          halfWidth
                          value={val}
                          style={{ width: '95%' }}
                          onChange={(e) => changeFlowersPrices(e.target.value, "flowersPrice", index)}
                        />
                      </FormControl>
                    ))}
                  </Box>

                </CardContent>
                : ""}
            </Card>
          </div>
          {(reservationType == 1) ?
            // Candle
            <>
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

                    <Box component="fieldset">
                      <legend>Veg Menu</legend>

                      {vegmenus?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Menu-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => setMenu(e.target.value, "veg", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>


                    <Box component="fieldset">
                      <legend>Non-veg Menu</legend>

                      {nonvegmenus?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Menu-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => setMenu(e.target.value, "nonveg", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </div>
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
                        label="Veg Images"

                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <input type="file" multiple accept="image/*" onChange={onVegImageChange} style={{ display: 'none' }} id="icon-button-file2" />
                              <label htmlFor="icon-button-file2">
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
                        label="Non-veg Images"

                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <input type="file" multiple accept="image/*" onChange={onNonVegImageChange} style={{ display: 'none' }} id="icon-button-file3" />
                              <label htmlFor="icon-button-file3">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                  <AttachFileIcon />
                                </IconButton>
                              </label>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>

                    <Box component="fieldset">
                      <legend>Cake</legend>

                      {cakes?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Cake-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changeMenu(e.target.value, "cake", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>

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
            </> :

            //  Birthday
            <>
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

                    <Box component="fieldset">
                      <legend>Cake</legend>

                      {cakes?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Cake-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changeMenu(e.target.value, "cake", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card style={{
                  width: '90%',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)',
                  border: 'solid 1px #ffc107',
                  paddingTop: '3vh',
                  paddingBottom: '3vh',
                  marginTop: '1vh',
                }}>
                  <CardContent>
                    <Box component="fieldset">
                      <legend>Photo Shoot</legend>
                      {photoShoots?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Photo Shoot-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changePhotoShoots(e.target.value, "print", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>

                    <Box component="fieldset">
                      <legend>Photo Shoot Price</legend>
                      {photoShootPrices?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Photo Shoot Price-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changePhotoShootPrices(e.target.value, "print", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>

                  </CardContent>
                </Card>
              </div>

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
                  <CardContent>
                    <Box component="fieldset">
                      <legend>Photo Print</legend>
                      {photoPrints?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Photo Print-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changePhotoPrints(e.target.value, "print", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>

                    <Box component="fieldset">
                      <legend>Photo Print Price</legend>
                      {photoPrintPrices?.map((val, index) => (

                        <FormControl key={index} style={{ width: '50%' }}>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            label={`Photo Print Price-${index + 1}`}
                            margin="normal"
                            halfWidth
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changePhotoShootPrices(e.target.value, "print", index)}
                          />
                        </FormControl>
                      ))}
                    </Box>

                  </CardContent>
                </Card>
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
                    marginTop: '1vh',
                  }}
                >

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
            </>
          }
        </div>
      </div >
    </>
  )
}

export default ResSubCatPost