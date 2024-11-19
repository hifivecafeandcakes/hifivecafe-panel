import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FormControl, TextField, TextareaAutosize, IconButton, InputAdornment, Button, Card, CardContent, CardActions } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Modal } from '@mui/material';
import ImageShowModel from './ImageShowModel';
import ImagesShowModel from './ImagesShowModel';
import { InputLabel, Select, MenuItem } from '@mui/material';

const AddReservation = () => {
  const [Title, setTitle] = useState('');
  const [ID, setID] = useState('');
  const [MainTitle, setMainTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Image, setImage] = useState('');
  const [deleteImg, setDeleteImg] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [deleteImgs, setDeleteImgs] = useState([]);
  const [Video, setVideo] = useState('');
  const [deleteVideo, setDeleteVideo] = useState('');

  const [status, setStatus] = useState('Active');

  const [modalImage, setModalImage] = useState(false);
  const [modalImages, setModalImages] = useState(false);

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
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/get/${id}`)
      .then(function (res) {
        let data = res?.data;
        console.log(res.data);
        if (data?.Response.Success === '1') {
          console.log(data?.Response.result);
          let result = data?.Response.result[0];
          setTitle(result.reser_title);
          setMainTitle(result.reser_main_title);
          setDescription(result.description);
          console.log(result.reser_image);
          console.log(result.extra_img);
          setImage(result.reser_image);
          setSelectedImages(result.extra_img);
          setVideo(result.reser_video);
          setStatus(result.status);
          setID(id);
        } else {
          setID('');
          Swal.fire({icon: 'Success',title: 'No Record Found',position: 'center'});
          navigate('/ListReservation');
        }
      })
      .catch((error) => {
        setID('');
        Swal.fire({icon: 'Error',title: 'Error in Fetching',position: 'center'});
        navigate('/ListReservation');
      });
  }, [id]);

  const onExtraImageChange = (e) => {
    const files = e.target.files;
    let totalImg = selectedImages.length + files.length;
    if (totalImg > 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select 4 or fewer extra images.',
        position: 'center',
        timer: 3000,
      });
      return;
    }

    if (files && files.length > 0) {
      let selectedImages2 = Array.from(files);
      if (ID) {
        // let existfiless = selectedImages
        // console.log(selectedImages);
        // selectedImages2.map((image, index) => (
        //   existfiless.push(image)
        // ));
        // setSelectedImages(existfiless);
        let updatedImages = [...selectedImages, ...selectedImages2];  // Merge the arrays
        setSelectedImages(updatedImages);  // Set the new state
        console.log(updatedImages);  // Log the updated state
      } else {
        setSelectedImages(selectedImages2);
      }
      console.log(selectedImages);
      console.log('Selected images:', files);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No images selected!',
        position: 'center',
      });
    }
  };



  const onVideoChange = (event) => {
    event.preventDefault();
    const video = event.target.files[0];
    console.log("Selected video:", video);
    if (video) {
      if (video.type.startsWith('video/')) {
        setVideo(video);
        console.log("VIDEO :", video);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid file type for video!',
          position: 'center',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No video selected!',
        position: 'center',
      });
    }
  };



  const handleSubmit = () => {


    if (!Title || !MainTitle || !Description || !Image) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all fields and select images.',
        position: 'center',
        timer: 3000,
      });
      return;
    }

    if (selectedImages.length > 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select 4 or fewer extra images.',
        position: 'center',
        timer: 3000,
      });
      return;
    }

    console.log('reser_title', Title);
    console.log('reser_main_title', MainTitle);
    console.log('description', Description);
    console.log('reser_img', Image);


    const formData = new FormData();
    formData.append('reser_title', Title);
    formData.append('reser_main_title', MainTitle);
    formData.append('description', Description);
    formData.append('reser_img', Image);

    console.log(selectedImages);

    selectedImages.forEach((file, index) => {
      // if (typeof Image === "string") {
      formData.append('img', file);
      // } else {
      // if (file.type.startsWith('image/')) {
      // formData.append(`img`, file);
      // console.log('img', file);
      // }
      // }
    });

    deleteImgs.forEach((file, index) => {
      formData.append(`deleteImgs`, file);
    });



    console.log('Video', Video);
    console.log('Video', typeof (Video));

    if (Video && Video != null) {
      formData.append('video', Video);
    }

    if (deleteVideo && deleteVideo != null) {
      formData.append('deleteVideo', deleteVideo);
      formData.append('video', '');
    }

    if (ID) {
      formData.append('id', ID);
    }
    formData.append('status', status);

    let URL = (ID) ? `${process.env.REACT_APP_API_URL}/admin/reservation/update` : `${process.env.REACT_APP_API_URL}/admin/reservation/add`;

    axios
      .post(URL, formData)
      .then(function (res) {
        console.log(res.data);
        if (res?.data?.Response?.Success == '1') {
          Swal.fire({icon: 'success',title: res.data.Response.message,position: 'center',timer: 3000,});
          navigate('/ListReservation');
        } else {
          Swal.fire({icon: 'error',title: res.data.Response.message,position: 'center',timer: 3000,});
        }
      })
      .catch((error) => {
        console.error('fetching error:', error);
        Swal.fire({icon: 'error',title: "Something Went Wrong",position: 'center',timer: 3000,});
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

  const clickDeleteVideo = (e) => {
    console.log(deleteVideo)
    setDeleteVideo(getLastSlash(Video));
    setVideo("");
    console.log(deleteVideo)
  }



  const clickDeleteImages = (e) => {
    let keyIndex = e.target.id
    console.log(keyIndex)
    let selectedImages1 = selectedImages;
    let deletedimg = deleteImgs;
    if (keyIndex > -1) {
      // console.log(deleteImgs)
      console.log(getLastSlash(selectedImages1[keyIndex]))
      deletedimg.push(getLastSlash(selectedImages1[keyIndex]))
      setDeleteImgs(deletedimg);
      selectedImages1.splice(keyIndex, 1);
      console.log(selectedImages1)

      setSelectedImages([...selectedImages1]);

      console.log(deleteImgs)
    }
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
                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Main Title"
                    fullWidth
                    margin="normal"
                    value={MainTitle}
                    required
                    onChange={(e) => setMainTitle(e.target.value)}
                  />
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
                        <img onClick={() => setModalImage(true)} src={(typeof image === "string") ? image : URL.createObjectURL(image)}
                          alt="Uploaded" />
                        <div className='name'>{(ID && (typeof image === "string")) ? getLastSlash(image) : image.name}</div>
                      </div>
                    </>
                  ))}
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label="Video"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <input type="file" accept="video/*" onChange={onVideoChange} style={{ display: 'none' }} id="icon-button-file3" />
                          <label htmlFor="icon-button-file3">
                            <IconButton color="primary" aria-label="upload video" component="span">
                              <AttachFileIcon />
                            </IconButton>
                          </label>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {Video &&
                    <>
                      {(ID) ?
                        <div className="img-container" style={{ wordWrap: 'break-word' }}>
                          <button type="button" className="delete-btn" id={0} onClick={(e) => { clickDeleteVideo(e) }}>X</button>
                          <video height="240" controls>
                            <source src={Video} type="video/mp4" />
                          </video>
                          <div className='name'>{(ID && (typeof Video === "string")) ? getLastSlash(Video) : Video.name}</div>
                        </div> :
                        Video.name
                      }
                    </>
                  }
                </FormControl>

                <FormControl fullWidth variant="outlined" style={{marginTop:"20px"}}>
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
      <ImagesShowModel open={modalImages} setOpen={setModalImages} images={selectedImages} />
    </>
  );
};

export default AddReservation;
