import React, { useEffect, useState } from 'react'
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { Pagination, CircularProgress, TablePagination } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Grid, FormControl, InputLabel, Modal } from '@mui/material';
import Slider from "react-slick";

import Swal from 'sweetalert2';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';

const ResCatGet = () => {

  const [SelectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([])
  const [result1, setResult1] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    // setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/reservation/category/admin/list`)
      .then((res) => {
        let data = res?.data;


        if (data?.Response.Success == "1") {
          setResult1(data?.Response.result);
          console.log("result :", data?.Response.result);
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



  const handleSubmit = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/reservation/category/admin/list?resercat_id=${SelectedType}`)
      .then((res) => {
        let data = res?.data;


        if (data?.Response?.Success == "1") {
          setResult(data?.Response?.result);
          console.log("DATAAA :", data?.Response?.result);

        } else {
          Swal.fire({
            customClass: {
              container: 'smaller-swal',
            },
            title: data?.Response.message,
            position: 'center',
          }).then(() => {
            // window.location.reload();
            setResult([]);
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
      .finally(() => {
        setLoading(false);
      });
  }




  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setcurrentpage(1);
    console.log("TYPE_ID :", event.target.value);
  };


  const [currentpage, setcurrentpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    setcurrentpage(1);
    result.filter((value) => {
      return Object.values(value)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
  };

  const [searchInput, setSearchInput] = useState("");



  const filteredData = result.filter((value) => {
    return (
      String(value.referral_code)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.name)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.mobile)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.account_holder_name)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.account_number)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.account_IFSC)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.account_pan_number)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.account_pan_status)?.toLowerCase().includes(searchInput?.toLowerCase())
    );
  });





  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };




  const recordsperpage = rowsPerPage;
  const lastindex = currentpage * recordsperpage;
  const firstindex = lastindex - recordsperpage;
  const records = filteredData?.slice(firstindex, lastindex);
  const npage = Math.ceil(filteredData.length / rowsPerPage);
  const totalRecords = filteredData.length;

  const handleChangePage = (event, newPage) => {
    setcurrentpage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setcurrentpage(1);
  };

  const handleEdit = (id) => {
    localStorage.setItem("res_cat_id", id)
    alert("ID :", id)
    // window.location.href = '/panel/subadmin/ResCatUpdate'
  }


  const handleOpenModal = (cat_image) => {
    setSelectedImage(cat_image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };



  return (
    <>
      <div className="content-wrapper"
        style={{
          background: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#fff',
        }}
      >
        <div className="col-lg-12 my-3 px-3">
          <div className="row">
            <Grid item xs={3} style={{ width: '50vh', display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Reservation Type</InputLabel>
                <Select className="bg-light"
                  value={SelectedType}
                  onChange={handleTypeChange}
                  label="Sub-Category"
                >
                  {result1?.map((reservation, index) => (
                    <MenuItem key={index} value={reservation.reser_id}>
                      {reservation.reser_title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant='contained' className='mx-3'
                onClick={handleSubmit}
              >Submit</Button>
            </Grid>
            <div className="col-lg-12">
              <div className="card mt-3">
                <div className="card-header">
                  <h3 className="card-title">Category List</h3>
                  <div className="card-tools">
                    <div
                      className="input-group input-group-sm my-1"
                      style={{ width: 150 }}
                    >
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search"
                      // onChange={(e) => searchItems(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body table-responsive p-0">

                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5vh', paddingBottom: '5vh' }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table className="table table-hover text-nowrap">
                        <TableHead className='bg-warning'>
                          <TableRow style={{ fontSize: '13px' }}>
                            <TableCell className='text-center'>S.NO</TableCell>

                            {/* <TableCell className='text-center'>RESERVATION ID</TableCell> */}

                            <TableCell className='text-center'>Reservation Title</TableCell>

                            <TableCell className='text-center'>Category Title</TableCell>

                            <TableCell className='text-center'>IMAGE</TableCell>

                            <TableCell className='text-center'>Range</TableCell>

                            {/* <TableCell className='text-center'>EXTRA IMAGES</TableCell> */}

                            <TableCell className='text-center'>STATUS</TableCell>

                            {/* <TableCell className='text-center'>EDIT</TableCell> */}

                            <TableCell className='text-center'>CREATED AT</TableCell>

                          </TableRow>
                        </TableHead>



                        <TableBody>
                          {result1?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className='text-center'>{index + 1}</TableCell>
                              {item.reser_id == '1' ? (
                                <TableCell className='text-center'>CANDLE LIGHT DINNER</TableCell>
                              ) : item.reser_id == '2' ? (
                                <TableCell className='text-center'>BIRTHDAY EVENTS</TableCell>
                              ) : item.reser_id == '3' ? (
                                <TableCell className='text-center'>BOOK A TABLE</TableCell>
                              ) : (
                                <TableCell className='text-center'>BIRTHDAY EVENTS</TableCell>
                              )}
  

                              <TableCell className='text-center'>{item.cat_title}</TableCell>


                              <TableCell className='text-center' onClick={() => handleOpenModal(item.cat_image)}>
                                <ImageIcon className='text-primary' />
                              </TableCell>
                              <TableCell className='text-center'>{item.price_range}</TableCell>
                              <TableCell className='text-center'>{item.cat_status == '1' ? 'Active' : 'Inactive'}</TableCell>
                           
                              {/* <TableCell className='text-center'>
                                <Button onClick={() => handleEdit(item.cat_id)}>
                                  <EditIcon className='text-primary' />
                                </Button>
                              </TableCell> */}
                              
                              <TableCell className='text-center'>
                                {(new Date(item.created_at).toISOString().slice(0, 10).split('-').reverse().join('-'))}
                              </TableCell>




                              {/* {item.reservation_category_ilst?.map((category, catIndex) => (
                                  <React.Fragment key={catIndex}>


                                  
                                    <TableCell className='text-center'>{category.cat_title}</TableCell>
                                    <TableCell className='text-center'>
                                      <ImageIcon className='text-primary' />
                                    </TableCell>
                                    <TableCell className='text-center'>{category.price_range}</TableCell>
                                    <TableCell className='text-center'>{category.cat_status == '1' ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell className='text-center'>
                                      <Button onClick={() => handleEdit(category.cat_id)}>
                                        <EditIcon className='text-primary' />
                                      </Button>
                                    </TableCell>
                                    <TableCell className='text-center'>
                                      {(new Date(category.created_at).toISOString().slice(0, 10).split('-').reverse().join('-'))}
                                    </TableCell>



                                  </React.Fragment>
                                ))} */}







                            </TableRow>
                          ))}

                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </div>

                <div
                  style={{ display: 'flex', alignItems: 'center' }}
                  className="card-footer d-flex">
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={totalRecords}
                    page={currentpage - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  {/* <p className='my-2 mx-3'>Total Results: {totalRecords}</p> */}
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>







      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="modal-content" style={{ width: '60%', height: '80%', padding: '1rem' }}>
          <span className="close" onClick={handleCloseModal}>&times;</span>
          {selectedImage && (
            <img
              style={{
                width: '100%',
                height: '100%',
                // objectFit: 'containe',
                objectFit: 'scale-down',
                display: 'block',
              }}
              src={selectedImage}
              alt="Modal"
            />
          )}
        </div>
      </Modal>

    </>
  )
}

export default ResCatGet






















