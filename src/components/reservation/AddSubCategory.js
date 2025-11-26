import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';
import Box from "@mui/material/Box";
import ImageShowModel from './ImageShowModel';
import ImagesShowModel from './ImagesShowModel';
import { useNavigate, useParams } from 'react-router-dom';

const AddSubCategory = () => {

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [range, setRange] = useState('');
  const [Image, setImage] = useState(null);
  const [deleteImg, setDeleteImg] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [deleteImgs, setDeleteImgs] = useState([]);
  const [ID, setID] = useState('');
  const [currentpage, setcurrentpage] = useState(1);

  const [reservationList, setReservationList] = useState([]);
  const [reserId, setReserId] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [CatID, setCatID] = useState('');

  const [status, setStatus] = useState('Active');




  const [modalImage, setModalImage] = useState(false);
  const [modalImages, setModalImages] = useState(false);
  const [modalVegImages, setModalVegImages] = useState(false);
  const [modalNonVegImages, setModalNonVegImages] = useState(false);

  const [selectedVegImages, setSelectedVegImages] = useState([]);
  const [deleteVegImgs, setDeleteVegImgs] = useState([]);
  const [selectedNonVegImages, setSelectedNonVegImages] = useState([]);
  const [deleteNonVegImgs, setDeleteNonVegImgs] = useState([]);


  const [vegmenus, setVegmenus] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [nonvegmenus, setNonvegmenus] = useState(["", "", "", "", "", "", "", "", "", ""]);


  //candle and birthday
  const [cakes, setCakes] = useState(["", "", "", "", "", "", "", "", "", ""]);

  //birthday only
  const [photoPrints, setPhotoPrints] = useState(["", "", "", "", ""]);
  const [photoPrintPrices, setPhotoPrintPrices] = useState(["", "", "", "", ""]);

  const [flowers, setFlowers] = useState(["", "", "", "", ""]);
  const [flowersPrices, setFlowersPrices] = useState(["", "", "", "", ""]);

  const [photoShoots, setPhotoShoots] = useState(["", "", "", "", ""]);
  const [photoShootPrices, setPhotoShootPrices] = useState(["", "", "", "", ""]);

  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/subcategory/get/${id}`)
      .then(function (res) {
        let data = res?.data;
        console.log(res.data);
        if (data?.Response.Success === '1') {
          console.log(data?.Response.result);
          let result = data?.Response.result[0];
          setTitle(result.sub_tilte);
          setReserId(result.reser_id);
          categoryListSelect(result.reser_id);
          setCatID(result.reser_cat_id);
          setRange(result.sub_cat_price_range);
          setDescription(result.sub_cat_des);

          setSelectedVegImages(result.veg_images);
          setSelectedNonVegImages(result.nonveg_images);

          setImage(result.sub_img);
          setSelectedImages(result.sub_extra_img);
          setStatus(result.status);

          if (result.veg_menus && result.veg_menus != null) { setVegmenus(result.veg_menus) }
          if (result.nonveg_menus && result.nonveg_menus != null) { setNonvegmenus(result.nonveg_menus) }
          if (result.cakes && result.cakes != null) { setCakes(result.cakes); }
          if (result.photoPrints && result.photoPrints != null) { setPhotoPrints(result.photoPrints); }
          if (result.photoPrintPrices && result.photoPrintPrices != null) { setPhotoPrintPrices(result.photoPrintPrices); }
          if (result.flowers && result.flowers != null) { setFlowers(result.flowers); }
          if (result.flowersPrices && result.flowersPrices != null) { setFlowersPrices(result.flowersPrices); }
          if (result.photoShoots && result.photoShoots != null) { setPhotoShoots(result.photoShoots); }
          if (result.photoShootPrices && result.photoShootPrices != null) { setPhotoShootPrices(result.photoShootPrices); }


          setID(id);
        } else {
          setID('');
          Swal.fire({ icon: 'Success', title: 'No Record Found', position: 'center' });
          navigate('/ListSubCategory');
        }
      })
      .catch((error) => {
        console.log(error);
        setID('');
        Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
        navigate('/ListSubCategory');
      });
  }, [id]);

  useEffect(() => {
    reservationListSelect();
  }, []);


  const reservationListSelect = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/select`)
      .then(function (res) {
        let data = res?.data;
        if (data?.Response.Success === '1') { setReservationList(data?.Response.result); }
        else {
          setReserId('');
          Swal.fire({ icon: 'Success', title: 'Reservation Type Record Found', position: 'center' });
        }
      })
      .catch((error) => {
        setReserId('');
        Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
      });
  }

  const categoryListSelect = (res_id) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/category/select/${res_id}`)
      .then(function (res) {
        let data = res?.data;
        if (data?.Response.Success === '1') { setCategoryList(data?.Response.result); }
        else {
          setCatID('');
          setCategoryList([]);
          Swal.fire({ icon: 'Success', title: 'Category Record Found', position: 'center' });
        }
      })
      .catch((error) => {
        setCatID('');
        setCategoryList([]);
        Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
      });
  }


  const handleReservationChange = (event) => {
    const resID = event.target.value;
    console.log("RES_TYPE :", resID);
    setReserId(resID)
    setCatID('')
    categoryListSelect(resID);
    stateBulkUpdate(resID);
  };

  const handleCatChange = (event) => {
    const resID = event.target.value;
    setCatID(resID);
    console.log("Cat_ID :", resID);
  }

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      console.log(Image);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type for image!',
        position: 'center',
      });
    }
  };

  const onExtraImageChange = (e) => {
    const files = e.target.files;
    let totalImg = selectedImages.length + files.length;
    if (totalImg > 4) {
      Swal.fire({ icon: 'warning', title: 'Please select 4 or fewer extra images.', position: 'center', timer: 3000, });
      return;
    }
    if (files && files.length > 0) {
      let selectedImages2 = Array.from(files);
      if (ID) {
        let updatedImages = [...selectedImages, ...selectedImages2];
        setSelectedImages(updatedImages);
      } else {
        setSelectedImages(selectedImages2);
      }
      console.log(selectedImages);
      console.log('Selected images:', files);
    } else {
      Swal.fire({ icon: 'error', title: 'No images selected!', position: 'center', });
    }
  };


  const onVegImageChange = (e) => {
    const files = e.target.files;
    let totalImg = selectedVegImages.length + files.length;
    if (totalImg > 10) {
      Swal.fire({ icon: 'warning', title: 'Please select 10 or fewer Veg images.', position: 'center', timer: 3000, });
      return;
    }
    if (files && files.length > 0) {
      let selectedVegImages2 = Array.from(files);
      if (ID) {
        let updatedImages = [...selectedVegImages, ...selectedVegImages2];
        setSelectedVegImages(updatedImages);
      } else {
        setSelectedVegImages(selectedVegImages2);
      }
      console.log(selectedVegImages);
      console.log('Selected Veg images:', files);
    } else {
      Swal.fire({ icon: 'error', title: 'No Veg images selected!', position: 'center', });
    }
  };

  const onNonVegImageChange = (e) => {
    const files = e.target.files;
    let totalImg = selectedNonVegImages.length + files.length;
    if (totalImg > 10) {
      Swal.fire({ icon: 'warning', title: 'Please select 10 or fewer non veg images.', position: 'center', timer: 3000, });
      return;
    }
    if (files && files.length > 0) {
      let selectedNonVegImages2 = Array.from(files);
      if (ID) {
        let updatedImages = [...selectedNonVegImages, ...selectedNonVegImages2];
        setSelectedNonVegImages(updatedImages);
      } else {
        setSelectedNonVegImages(selectedNonVegImages2);
      }
      console.log(selectedNonVegImages);
      console.log('Selected Non veg images:', files);
    } else {
      Swal.fire({ icon: 'error', title: 'No non veg images selected!', position: 'center', });
    }
  };


  const getLastSlash = (str) => {
    str = str.split("/");
    console.log(str[str.length - 1]);
    return str[str.length - 1];
  }

  const clickDeleteImage = (e) => {
    console.log(deleteImg)
    setDeleteImg(getLastSlash(Image));
    setImage("");
    console.log(deleteImg)
  }

  const clickDeleteImages = (e) => {
    let keyIndex = e.target.id
    let selectedImages1 = selectedImages;
    let deletedimg = deleteImgs;
    if (keyIndex > -1) {
      deletedimg.push(getLastSlash(selectedImages1[keyIndex]))
      setDeleteImgs(deletedimg);
      selectedImages1.splice(keyIndex, 1);
      setSelectedImages([...selectedImages1]);
    }
  }

  const clickDeleteVegImages = (e) => {
    let keyIndex = e.target.id
    let selectedVegImages1 = selectedVegImages;
    let deletedimg = deleteVegImgs;
    if (keyIndex > -1) {
      deletedimg.push(getLastSlash(selectedVegImages1[keyIndex]))
      setDeleteVegImgs(deletedimg);
      selectedVegImages1.splice(keyIndex, 1);
      setSelectedVegImages([...selectedVegImages1]);
    }
  }


  const clickDeleteNonVegImages = (e) => {
    let keyIndex = e.target.id
    let selectedNonVegImages1 = selectedNonVegImages;
    let deletedimg = deleteNonVegImgs;
    if (keyIndex > -1) {
      deletedimg.push(getLastSlash(selectedNonVegImages1[keyIndex]))
      setDeleteNonVegImgs(deletedimg);
      selectedNonVegImages1.splice(keyIndex, 1);
      setSelectedNonVegImages([...selectedNonVegImages1]);
    }
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

  function changePhotoPrintsPrice(newValue, field, index) {
    let updatedArray1 = photoPrintPrices.map((item, i) => (i === index ? newValue : item));
    setPhotoPrintPrices(updatedArray1);
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

  const stateBulkUpdate = async (reserId) => {
    return new Promise((resolve) => {
      if (reserId == 1) {
        console.log("jbhjbjb");
        setPhotoPrints(["", "", "", "", ""])
        setPhotoPrintPrices(["", "", "", "", ""])
        setFlowers(["", "", "", "", ""])
        setFlowersPrices(["", "", "", "", ""])
        setPhotoShoots(["", "", "", "", ""])
        setPhotoShootPrices(["", "", "", "", ""])
      } else if (reserId == 2) {
        setVegmenus(["", "", "", "", "", "", "", "", "", ""]);
        setNonvegmenus(["", "", "", "", "", "", "", "", "", ""]);
        setSelectedVegImages([]);
        setSelectedNonVegImages([])

        if (ID && selectedVegImages && selectedVegImages.length > 0) {
          let detVeg = [];
          for (let i = 0; i < selectedVegImages.length; i++) {
            if (typeof selectedVegImages[i] === 'string') {
              detVeg.push(getLastSlash(selectedVegImages[i]));
            }
          }
          setDeleteVegImgs(detVeg);
        }

        if (ID && selectedNonVegImages && selectedNonVegImages.length > 0) {
          let detVeg1 = [];
          for (let i = 0; i < selectedNonVegImages.length; i++) {
            if (typeof selectedNonVegImages[i] === 'string') {
              detVeg1.push(getLastSlash(selectedNonVegImages[i]));
            }
          }
          setDeleteNonVegImgs(detVeg1);
        }

      } else {
        setVegmenus(["", "", "", "", "", "", "", "", "", ""]);
        setNonvegmenus(["", "", "", "", "", "", "", "", "", ""]);
        setSelectedVegImages([]);
        setSelectedNonVegImages([])
        setFlowers(["", "", "", "", ""])
        setFlowersPrices(["", "", "", "", ""])

        if (ID && selectedVegImages && selectedVegImages.length > 0) {
          let detVeg = [];
          for (let i = 0; i < selectedVegImages.length; i++) {
            if (typeof selectedVegImages[i] === 'string') {
              detVeg.push(getLastSlash(selectedVegImages[i]));
            }
          }
          setDeleteVegImgs(detVeg);
        }

        if (ID && selectedNonVegImages && selectedNonVegImages.length > 0) {
          let detVeg1 = [];
          for (let i = 0; i < selectedNonVegImages.length; i++) {
            if (typeof selectedNonVegImages[i] === 'string') {
              detVeg1.push(getLastSlash(selectedNonVegImages[i]));
            }
          }
          setDeleteNonVegImgs(detVeg1);
        }
      }
      resolve(true);
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();



    if (!reserId) {
      Swal.fire({ icon: 'warning', title: 'Kindly select the reservation type.', position: 'center', timer: '3000', });
      return;
    }

    if (!CatID) {
      Swal.fire({ icon: 'warning', title: 'Kindly select the reservation category.', position: 'center', timer: '3000', });
      return;
    }

    if (!Title) {
      Swal.fire({ icon: 'warning', title: 'Kindly select the title.', position: 'center', timer: '3000', });
      return;
    }

    if (!range) {
      Swal.fire({ icon: 'warning', title: 'Kindly select the Price Range.', position: 'center', timer: '3000', });
      return;
    }

    if (!Image) {
      Swal.fire({ icon: 'warning', title: 'Kindly select the Image.', position: 'center', timer: '3000', });
      return;
    }

    // if (!selectedImages) {
    //   Swal.fire({ icon: 'warning', title: 'Kindly select the extra image.', position: 'center', timer: '3000', });
    //   return;
    // }

    console.log(selectedVegImages);
    // if ((reserId == 1) && (selectedVegImages && selectedVegImages.length <= 0)) {
    //   Swal.fire({ icon: 'warning', title: 'Kindly Provide the Veg menu image.', position: 'center', timer: '3000', });
    //   return;
    // }

    // if ((reserId == 1) && (selectedNonVegImages && selectedNonVegImages.length <= 0)) {
    //   Swal.fire({ icon: 'warning', title: 'Kindly Provide the Non Veg menu image.', position: 'center', timer: '3000', });
    //   return;
    // }

    // if ((reserId == 1) && (vegmenus[0] == "")) {
    //   Swal.fire({ icon: 'warning', title: 'Kindly provide One veg menu', position: 'center', timer: '3000', });
    //   return;
    // }

    // if ((reserId == 1) && (nonvegmenus[0] == "")) {
    //   Swal.fire({ icon: 'warning', title: 'Kindly provide One non-veg menu', position: 'center', timer: '3000', });
    //   return;
    // }

    await stateBulkUpdate();
    await AfterSubmit();

  };


  const AfterSubmit = async () => {
    return new Promise((resolve) => {
      console.log('id', ID);
      console.log('cat_id', CatID);
      console.log('title', Title);
      console.log('range', range);
      console.log('image', Image);
      console.log('Extra_image', selectedImages);
      console.log('veg_image', selectedVegImages);
      console.log('nonveg_image', selectedNonVegImages);
      console.log('photoPrints', photoPrints);

      const formData = new FormData();

      formData.append('reser_id', reserId);
      formData.append('reser_cat_id', CatID);
      formData.append('sub_tilte', Title);
      formData.append('sub_cat_des', Description);
      formData.append('sub_cat_price_range', range);

      if (Image) { formData.append('sub_img', Image); }

      if (selectedImages && selectedImages.length > 0) {
        for (let i = 0; i < selectedImages.length; i++) {
          formData.append('img', selectedImages[i]);
        }
      }

      deleteImgs.forEach((file, index) => {
        formData.append(`deleteImgs`, file);
      });

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

      deleteVegImgs.forEach((file, index) => {
        formData.append(`deleteVegImages`, file);
      });

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

      deleteNonVegImgs.forEach((file, index) => {
        formData.append(`deleteNonVegImages`, file);
      });

      if (cakes && cakes.length > 0) {
        for (let i = 0; i < cakes.length; i++) {
          formData.append('cakes', cakes[i]);
        }
      }

      if (photoShoots && photoShoots.length > 0) {
        for (let i = 0; i < photoShoots.length; i++) {
          formData.append('photoShoots', photoShoots[i]);
        }
      }

      if (photoShootPrices && photoShootPrices.length > 0) {
        for (let i = 0; i < photoShootPrices.length; i++) {
          formData.append('photoShootPrices', photoShootPrices[i]);
        }
      }

      if (photoPrints && photoPrints.length > 0) {
        for (let i = 0; i < photoPrints.length; i++) {
          console.log(photoPrints[i]);
          formData.append('photoPrints', photoPrints[i]);
        }
      }

      if (photoPrintPrices && photoPrintPrices.length > 0) {
        for (let i = 0; i < photoPrintPrices.length; i++) {
          formData.append('photoPrintPrices', photoPrintPrices[i]);
        }
      }

      if (flowers && flowers.length > 0) {
        for (let i = 0; i < flowers.length; i++) {
          formData.append('flowers', flowers[i]);
        }
      }

      if (flowersPrices && flowersPrices.length > 0) {
        for (let i = 0; i < flowersPrices.length; i++) {
          formData.append('flowersPrices', flowersPrices[i]);
        }
      }

      if (ID) { formData.append('id', ID); }
      formData.append('status', status);
      let URL = (ID) ? `${process.env.REACT_APP_API_URL}/admin/reservation/subcategory/update` : `${process.env.REACT_APP_API_URL}/admin/reservation/subcategory/add`;

      axios
        .post(URL, formData)
        .then(function (res) {
          console.log(res.data);
          if (res?.data?.Response?.Success == '1') {
            Swal.fire({ icon: 'success', title: res.data.Response.message, position: 'center', timer: 3000, });
            navigate('/ListSubCategory');
          } else {
            Swal.fire({ icon: 'error', title: res.data.Response.message, position: 'center', timer: 3000, });
          }
        })
        .catch((error) => {
          console.error('fetching error:', error);
          Swal.fire({ icon: 'error', title: "Something Went Wrong", position: 'center', timer: 3000, });
        });

      resolve();
    });
  }



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
                paddingLeft: '1%',
                paddingRight: '1%',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)',
                border: 'solid 1px #ffc107',
                paddingTop: '2px',
                paddingBottom: '2px',
                marginTop: '3vh',
              }}
            >
              <CardContent className="mx-1">

                <FormControl fullWidth variant="outlined">
                  <InputLabel>Reservation Type</InputLabel>
                  <Select className="bg-light"
                    value={reserId}
                    required
                    onChange={handleReservationChange}
                    label="Sub-Category"
                  >
                    {reservationList?.map((reservation, index) => (
                      <MenuItem key={index} value={reservation.reser_id}>
                        {reservation.reser_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" className='mt-4'>
                  <InputLabel>Category Type</InputLabel>
                  <Select className="bg-light"
                    value={CatID}
                    required
                    onChange={handleCatChange}
                    label="Sub-Category"
                  >
                    {categoryList?.map((category, index) => (
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
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 150 }}   
                  />
                </FormControl>


                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Price"
                    type="number"
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
                            required
                            style={{ display: 'none' }}
                            id="icon-button-file"
                            onChange={onImageChange}
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
                  {Image &&
                    <>
                      <div className="img-container">
                        {(ID) ?
                          <button id={0} type="button" className="delete-btn" onClick={(e) => { clickDeleteImage() }}>X</button> : ""}
                        <img onClick={() => setModalImage(true)} src={(typeof Image === "string") ? Image : URL.createObjectURL(Image)}
                          alt="Uploaded" />
                        <div className='name'>{(ID && (typeof Image === "string")) ? getLastSlash(Image) : Image.name}</div>
                      </div>
                    </>
                  }
                </FormControl>


                <FormControl fullWidth>
                  <TextField
                    label="Extra Image"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <input type="file" multiple accept="image/*" onChange={onExtraImageChange} style={{ display: 'none' }} id="icon-button-file2" />
                          <label htmlFor="icon-button-file2">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                              <AttachFileIcon />
                            </IconButton>
                          </label>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {selectedImages && selectedImages.map((image, index) => (
                    <>
                      <div className="img-container" key={index}>
                        <button type="button" className="count-btn" onClick={(e) => { }}>{index + 1}</button>
                        {(ID && (typeof image === "string")) ?
                          <button type="button" className="delete-btn" id={index} onClick={(e) => { clickDeleteImages(e) }}>X</button> : ""}
                        <img onClick={() => setModalImages(true)} src={(typeof image === "string") ? image : URL.createObjectURL(image)}
                          alt="Uploaded" />
                        <div className='name'>{(ID && (typeof image === "string")) ? getLastSlash(image) : image.name}</div>
                      </div>
                    </>
                  ))}
                </FormControl>

                <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
                  <InputLabel>Status</InputLabel>
                  <Select className="bg-light"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem key={0} value="Active">Active</MenuItem>
                    <MenuItem key={1} value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>



              </CardContent>

              {(reserId == 2) ?

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
                          type="number"
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
          {(reserId == 1) ?
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
                      <TextField label="Veg Image" fullWidth InputLabelProps={{ shrink: true }} margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <input type="file" multiple accept="image/*" onChange={onVegImageChange} style={{ display: 'none' }} id="icon-button-file3" />
                              <label htmlFor="icon-button-file3">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                  <AttachFileIcon />
                                </IconButton>
                              </label>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {selectedVegImages && selectedVegImages.map((image, index) => (
                        <>
                          <div className="img-container" key={index}>
                            <button type="button" className="count-btn" onClick={(e) => { }}>{index + 1}</button>
                            {(ID && (typeof image === "string")) ?
                              <button type="button" className="delete-btn" id={index} onClick={(e) => { clickDeleteVegImages(e) }}>X</button> : ""}
                            <img onClick={() => setModalVegImages(true)} src={(typeof image === "string") ? image : URL.createObjectURL(image)}
                              alt="Uploaded" />
                            <div className='name'>{(ID && (typeof image === "string")) ? getLastSlash(image) : image.name}</div>
                          </div>
                        </>
                      ))}
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField label="Non-Veg Image" fullWidth InputLabelProps={{ shrink: true }} margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <input type="file" multiple accept="image/*" onChange={onNonVegImageChange} style={{ display: 'none' }} id="icon-button-file4" />
                              <label htmlFor="icon-button-file4">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                  <AttachFileIcon />
                                </IconButton>
                              </label>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {selectedNonVegImages && selectedNonVegImages.map((image, index) => (
                        <>
                          <div className="img-container" key={index}>
                            <button type="button" className="count-btn" onClick={(e) => { }}>{index + 1}</button>
                            {(ID && (typeof image === "string")) ?
                              <button type="button" className="delete-btn" id={index} onClick={(e) => { clickDeleteNonVegImages(e) }}>X</button> : ""}
                            <img onClick={() => setModalNonVegImages(true)} src={(typeof image === "string") ? image : URL.createObjectURL(image)}
                              alt="Uploaded" />
                            <div className='name'>{(ID && (typeof image === "string")) ? getLastSlash(image) : image.name}</div>
                          </div>
                        </>
                      ))}
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
                            type="number"
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
                            type="number"
                            value={val}
                            style={{ width: '95%' }}
                            onChange={(e) => changePhotoPrintsPrice(e.target.value, "print", index)}
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

      <ImageShowModel open={modalImage} setOpen={setModalImage} image={Image} />
      <ImagesShowModel open={modalImages} setOpen={setModalImages} images={selectedImages} />
      <ImagesShowModel open={modalVegImages} setOpen={setModalVegImages} images={selectedVegImages} />
      <ImagesShowModel open={modalNonVegImages} setOpen={setModalNonVegImages} images={selectedNonVegImages} />
    </>
  )
}

export default AddSubCategory