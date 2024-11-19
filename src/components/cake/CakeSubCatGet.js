import React, { useEffect, useState } from 'react'
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { Pagination, CircularProgress, TablePagination } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Grid, FormControl, InputLabel } from '@mui/material';

import Swal from 'sweetalert2';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { Modal, Backdrop, Fade } from '@mui/material';


const CakeSubCatGet = () => {

  const [SelectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([])
  const [result1, setResult1] = useState([])


  const [openModal, setOpenModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');


  useEffect(() => {
    // setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/cake/category/get/list`)
      .then((res) => {
        let data = res?.data;
        // console.log("DATAAA :", data);

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





  const handleSubmit = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/cake/subcategory/get/list?cake_cat_id=${SelectedType}`)
      .then((res) => {
        let data = res?.data;
        //  console.log("DATAAA :", data);

        if (data?.Response?.Success == "1") {
          setResult(data?.Response?.result.subcategories);
          console.log('DATA', data?.Response?.result.subcategories);
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
    result?.filter((value) => {
      return Object.values(value)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
  };

  const [searchInput, setSearchInput] = useState("");



  const filteredData = result?.filter((value) => {
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


  console.log("records :", records);


  const handleOpenModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
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
                  {result1.map((cake, index) => (
                    <MenuItem key={index} value={cake.cake_id}>
                      {cake.cake_title}
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
                  <h3 className="card-title">Reservation Details</h3>
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

                            <TableCell className='text-center'>Cake Title</TableCell>

                            <TableCell className='text-center'>IMAGE</TableCell>

                            <TableCell className='text-center'>DESCRIPTION</TableCell>

                            <TableCell className='text-center'>PRICE</TableCell>

                            <TableCell className='text-center'>DISCOUNT</TableCell>

                            <TableCell className='text-center'>FINAL PRICE</TableCell>

                            <TableCell className='text-center'>STATUS</TableCell>

                          </TableRow>
                        </TableHead>



                        <TableBody>
                          {result.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className='text-center'>{index + 1}</TableCell>

                              <TableCell className='text-center'>{item.menu_title}</TableCell>

                              {/* <TableCell className='text-center'>
                                <ImageIcon
                                  className='text-primary'
                                  onClick={() => window.open(item.image_url, '_blank')}
                                  style={{ cursor: 'pointer' }}
                                />
                              </TableCell> */}


                              <TableCell className='text-center'>
                                <ImageIcon
                                  className='text-primary'
                                  onClick={() => handleOpenModal(item.image_url)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </TableCell>


                              <TableCell className='text-center' style={{ width: '45vh', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', verticalAlign: 'bottom', maxHeight: '3em', lineHeight: '1.5em' }}>
                                {item.menu_description}
                              </TableCell>

                              <TableCell className='text-center'>{item.menu_price}</TableCell>

                              <TableCell className='text-center'>{item.menu_discount}</TableCell>

                              <TableCell className='text-center'>{item.menu_final_price}</TableCell>

                              {item.menu_status ?
                                <TableCell className='text-center'>ACTIVE</TableCell>
                                :
                                <TableCell className='text-center'>ACTIVE</TableCell>
                              }

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

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>




      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ outline: 'none', textAlign: 'center', maxWidth: '50vw', maxHeight: '90vh' }}>
          <img
            src={modalImageUrl}
            alt="Modal"
            style={{ width: '60%', height: '60%', objectFit: 'contain' }}
          />
        </div>
      </Modal>


    </>
  )
}

export default CakeSubCatGet






















