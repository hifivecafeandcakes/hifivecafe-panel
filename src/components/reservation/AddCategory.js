import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FormControl, TextField, TextareaAutosize, IconButton, InputAdornment, Button, Card, CardContent, CardActions } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Modal } from '@mui/material';
import ImageShowModel from './DeleteModel';
import ImagesShowModel from './ImagesShowModel';
import { InputLabel, Select, MenuItem } from '@mui/material';

const AddCategory = () => {
  const [Title, setTitle] = useState('');
  const [ID, setID] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [reserId, setReserId] = useState('');
  const [Image, setImage] = useState('');
  const [deleteImg, setDeleteImg] = useState('');

  const [status, setStatus] = useState('Active');

  const [reservationList, setReservationList] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [modalImages, setModalImages] = useState(false);


  const [resCatCode, setResCatCode] = useState("silver");
  const [resCatCodes, setResCatCodes] = useState(['silver','gold','elite']);

  const navigate = useNavigate();

  const { id } = useParams();


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

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/category/get/${id}`)
      .then(function (res) {
        let data = res?.data;
        console.log(res.data);
        if (data?.Response.Success === '1') {
          console.log(data?.Response.result);
          let result = data?.Response.result[0];
          setTitle(result.cat_title);
          setResCatCode(result.reser_cat_code);
          setPriceRange(result.price_range);
          setImage(result.cat_image);
          setStatus(result.status);
          setReserId(result.reser_id);
          setID(id);
        } else {
          setID('');
          Swal.fire({
            icon: 'Success',
            title: 'No Record Found',
            position: 'center'
          });
          navigate('/ListCategory');
        }
      })
      .catch((error) => {
        setID('');
        Swal.fire({
          icon: 'Error',
          title: 'Error in Fetching',
          position: 'center'
        });
        navigate('/ListCategory');
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
        console.log(res.data);
        if (data?.Response.Success === '1') {
          console.log(data?.Response.result);
          let result = data?.Response.result;
          setReservationList(result);
        } else {
          setID('');
          Swal.fire({
            icon: 'Success',
            title: 'No Record Found',
            position: 'center'
          });
        }
      })
      .catch((error) => {
        setID('');
        Swal.fire({
          icon: 'Error',
          title: 'Error in Fetching',
          position: 'center'
        });
      });
  }

  const handleReservationChange = (event) => {
    setReserId(event.target.value);
  };

  const handleSubmit = () => {
    if (!Title || !priceRange || !Image || !reserId) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all fields and select images.',
        position: 'center',
        timer: 3000,
      });
      return;
    }


    const formData = new FormData();
    formData.append('cat_title', Title);
    formData.append('reser_cat_code', resCatCode);
    formData.append('price_range', priceRange);
    formData.append('cat_image', Image);
    formData.append('reser_id', reserId);

    if (ID) {
      formData.append('id', ID);
    }
    formData.append('status', status);

    let URL = (ID) ? `${process.env.REACT_APP_API_URL}/admin/reservation/category/update` : `${process.env.REACT_APP_API_URL}/admin/reservation/category/add`;

    axios
      .post(URL, formData)
      .then(function (res) {
        console.log(res.data);
        if (res?.data?.Response?.Success == '1') {
          Swal.fire({
            icon: 'success',
            title: res.data.Response.message,
            position: 'center',
            timer: 3000,
          });
          navigate('/ListCategory');
        } else {
          Swal.fire({
            icon: 'error',
            title: res.data.Response.message,
            position: 'center',
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('fetching error:', error);
        Swal.fire({
          icon: 'error',
          title: "Something Went Wrong",
          position: 'center',
          timer: 3000,
        });
      });
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

  return (
    <>
      <div className="content-wrapper Dashboard1-content" style={{ background: `url(${wallpaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#fff' }}>
        <div className="row">
          <div className="col-lg-12 p-3 bg-warning card-header">
            <h5>ADD NEW RESERVATION</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Card style={{ width: '90%', paddingLeft: '2%', paddingRight: '2%', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)', border: 'solid 1px #ffc107', paddingTop: '3vh', paddingBottom: '3vh', marginTop: '5vh' }}>
              <CardContent className="mx-3">

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
                  <InputLabel>Reservation Category Code</InputLabel>
                  <Select className="bg-light"
                    value={resCatCode}
                    required
                    onChange={(event) => setResCatCode(event.target.value)}
                    label="Reservation Category Code"
                  >
                    {resCatCodes?.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={Title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Price Range"
                    fullWidth
                    margin="normal"
                    value={priceRange}
                    required
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Image"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <input type="file" accept="image/*" onChange={onImageChange} style={{ display: 'none' }}
                            id="icon-button-file1" />
                          <label htmlFor="icon-button-file1">
                            <IconButton color="primary" component="span">
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
              <CardActions className="px-4">
                <Button style={{ backgroundColor: '#023678', marginTop: '-1.5vh' }} variant="contained" className="text-light mb-3 mx-2" onClick={handleSubmit}>
                  Submit
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>

      <ImageShowModel open={modalImage} setOpen={setModalImage} image={Image} />
    </>
  );
};

export default AddCategory;
