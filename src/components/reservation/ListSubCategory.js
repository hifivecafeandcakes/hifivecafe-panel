import React, { useEffect, useState } from 'react'
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { Pagination, CircularProgress, TablePagination, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Grid, FormControl, InputLabel, Modal } from '@mui/material';

import Swal from 'sweetalert2';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";


import ImageShowModel from './ImageShowModel';
import ImagesShowModel from './ImagesShowModel';
import { Link } from 'react-router-dom';
import DeleteModel from './DeleteModel';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

const ListSubCategory = () => {

  const [SelectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([])

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedExtraImage, setSelectedExtraImage] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenExtraImg, setModalOpenExtraImg] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEncryptId, setDeleteEncryptId] = useState("");

  // State for pagination
  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state


  const [reservationList, setReservationList] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const [filterResTitle, setFilterResTitle] = useState(''); // Filter by reservation
  const [filterCatTitle, setFilterCatTitle] = useState(''); // Filter by category

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page when search query changes
  };

  // Handle filter change
  const handleFilterResChange = (event) => {
    setFilterResTitle(event.target.value);
    categoryListSelect(event.target.value);
    setPage(0); // Reset to the first page when filter changes
  };


  // Handle filter change
  const handleFilterCatChange = (event) => {
    setFilterCatTitle(event.target.value);
    setPage(0); // Reset to the first page when filter changes
  };


  const handleOpenModal = (imageUrls) => {
    if (imageUrls.length > 0) {
      setSelectedExtraImage(imageUrls);
      setModalOpenExtraImg(true);
    }
  };

  const handleOpenModal1 = (sub_image) => {
    const array = []
    array.push(sub_image)
    console.log(array);
    setSelectedImage(array);
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (deleting_id) => {
    console.log(deleting_id);
    setDeleteEncryptId(deleting_id);
    setDeleteModalOpen(true);
  };


  const handleDeleteRecord = (e) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/subcategory/delete/${deleteEncryptId}`)
      .then(function (res) {
        let data = res?.data;
        console.log(res.data);
        if (data?.Response.Success === '1') {
          Swal.fire({
            icon: 'success',
            title: 'Record Deleted Successfully',
            position: 'center'
          });
          setDeleteEncryptId("")
          setTimeout(() => {
            window.location.reload();  // Reloads the page
          }, 2000);  // 3000ms = 3 seconds

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Record Deleted Unsuccessfully',
            position: 'center'
          });
          setDeleteEncryptId("")
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'Error',
          title: 'Error in Deleting',
          position: 'center'
        });
        setDeleteEncryptId("")
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/admin/reservation/subcategory/list`)
      .then((res) => {
        let data = res?.data;
        if (data?.Response.Success == "1") {
          setResult(data?.Response.result);
          console.log(data?.Response.result);
          reservationListSelect();
        } else {
          Swal.fire({ customClass: { container: 'smaller-swal', }, title: data?.Response.message, position: 'center' });
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        Swal.fire({ title: "error", text: "Failed to fetch data. Please contact admin!", icon: "error", position: 'center' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const reservationListSelect = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/select`)
      .then(function (res) {
        let data = res?.data;
        if (data?.Response.Success === '1') { setReservationList(data?.Response.result); }
        else {
          setFilterResTitle('');
          Swal.fire({ icon: 'Success', title: 'Reservation Type Record Found', position: 'center' });
        }
      })
      .catch((error) => {
        setFilterResTitle('');
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
          setFilterCatTitle('');
          setCategoryList([]);
          // Swal.fire({ icon: 'Success', title: 'Category Record Found', position: 'center' });
        }
      })
      .catch((error) => {
        setFilterCatTitle('');
        setCategoryList([]);
        // Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
      });
  }

  let filteredData = result.filter(
    (row) =>
      row.sub_tilte.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.cat_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.reser_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.price_range.toLowerCase().includes(searchQuery)
  );


  filteredData = filterResTitle
    ? filteredData.filter((row) => {
      return row.reser_id == filterResTitle;
    })
    : filteredData;


  filteredData = filterCatTitle
    ? filteredData.filter((row) => {
      return row.reser_cat_id == filterCatTitle;
    })
    : filteredData;


  const rows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

            <div className="col-lg-12">
              <div className="card mt-3">
                <div className="card-header">
                  <h3 className="card-title">Sub Category List </h3>
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
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-body table-responsive p-0">

                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5vh', paddingBottom: '5vh' }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <Paper>
                      <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                        {/* Filter Dropdown */}
                        <FormControl variant="outlined" style={{ minWidth: 200 }}>
                          <InputLabel>Reservation Type</InputLabel>
                          <Select
                            value={filterResTitle}
                            onChange={handleFilterResChange}
                            label="Filter by Reservation Type"
                          >
                            <MenuItem value="">All</MenuItem>
                            {reservationList?.map((reservation, index) => (
                              <MenuItem key={index} value={reservation.reser_id}>
                                {reservation.reser_title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ minWidth: 200 }}>
                          <InputLabel>Category Type</InputLabel>
                          <Select
                            value={filterCatTitle}
                            onChange={handleFilterCatChange}
                            label="Filter by Reservation Type"
                          >
                            <MenuItem value="">All</MenuItem>
                            {categoryList?.map((category, index) => (
                              <MenuItem key={category.cat_id} value={category.cat_id}>
                                {category.cat_title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <TableContainer component={Paper}>
                        <Table className="table table-hover text-nowrap">
                          <TableHead className='bg-warning'>
                            <TableRow style={{ fontSize: '13px' }}>
                              <TableCell className='text-center'>Action</TableCell>
                              <TableCell className='text-center'>S.NO</TableCell>
                              <TableCell className='text-center'>Sub-Category Title</TableCell>

                              <TableCell className='text-center'>Reservation Type</TableCell>

                              <TableCell className='text-center'>Category</TableCell>

                              <TableCell className='text-center'>Price Range</TableCell>

                              <TableCell className='text-center'>Image</TableCell>

                              <TableCell className='text-center'>Extra Image</TableCell>
                              <TableCell className='text-center'>STATUS</TableCell>

                              <TableCell className='text-center'>CREATED AT</TableCell>

                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {rows?.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className='text-center'>
                                  <Link to={`/UpdateSubCategory/${item.reser_sub_id}`}>
                                    <EditIcon />
                                  </Link>
                                  <Link onClick={() => { handleOpenDeleteModal(item.reser_sub_id) }}>
                                    <DeleteIcon />
                                  </Link>
                                </TableCell>
                                <TableCell className='text-center'>{index + 1}</TableCell>
                                <TableCell className='text-center'>{item.sub_tilte}</TableCell>
                                <TableCell className='text-center'>{item.reser_title}</TableCell>
                                <TableCell className='text-center'>{item.reser_cat_title}</TableCell>
                                <TableCell className='text-center'>{item.sub_cat_price_range}</TableCell>

                                <TableCell className='text-center' onClick={() => handleOpenModal1(item.sub_img)}>
                                  <ImageIcon className='text-primary' />
                                </TableCell>

                                <TableCell className='text-center' onClick={() => handleOpenModal(item.sub_extra_img)}>
                                  <ImageIcon className='text-primary' />
                                </TableCell>
                                <TableCell className={`text-center ${(item.status == "Active") ? "green" : ""}`}>{item.status}</TableCell>

                                <TableCell className='text-center'>
                                  {(new Date(item.created_at).toISOString().slice(0, 10).split('-').reverse().join('-'))}
                                </TableCell>

                              </TableRow>
                            ))}

                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={result.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageShowModel open={modalOpen} setOpen={setModalOpen} image={selectedImage} />
      <DeleteModel open={deleteModalOpen} setOpen={setDeleteModalOpen} deleteRecord={handleDeleteRecord} />
      <ImagesShowModel open={modalOpenExtraImg} setOpen={setModalOpenExtraImg} images={selectedExtraImage} />
    </>
  )
}

export default ListSubCategory






















