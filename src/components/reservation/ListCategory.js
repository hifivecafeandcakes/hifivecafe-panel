import React, { useEffect, useState } from 'react';
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { Pagination, CircularProgress, TablePagination, Box, InputLabel } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Modal, FormControl } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Swal from 'sweetalert2';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageShowModel from './ImageShowModel';
import ImagesShowModel from './ImagesShowModel';
import { Link } from 'react-router-dom';
import DeleteModel from './DeleteModel';
import { useNavigate } from 'react-router-dom';

const ListCategory = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEncryptId, setDeleteEncryptId] = useState("");

  const navigate = useNavigate();

  // State for pagination
  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const [filterResTitle, setFilterResTitle] = useState(''); // Filter by age range

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
  const handleFilterChange = (event) => {
    setFilterResTitle(event.target.value);
    setPage(0); // Reset to the first page when filter changes
  };



  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/admin/reservation/category/list`)
      .then((res) => {
        let data = res?.data;
        if (data?.Response.Success == "1") {
          setResult(data?.Response.result);
          console.log(data?.Response.result);
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (cat_image) => {
    const array = []
    array.push(cat_image)

    console.log("array", array);
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
      .get(`${process.env.REACT_APP_API_URL}/admin/reservation/category/delete/${deleteEncryptId}`)
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


  let filteredData = result.filter(
    (row) =>
      row.cat_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.reser_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.price_range.toLowerCase().includes(searchQuery)
  );


  filteredData = filterResTitle
    ? filteredData.filter((row) => {
      return row.reser_id == filterResTitle;
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
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Reservation List</h3>
                  <div className="card-content" >

                  </div>
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
                            onChange={handleFilterChange}
                            label="Filter by Reservation Type"
                          >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="1">candle</MenuItem>
                            <MenuItem value="2">Booking</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <TableContainer component={Paper}>
                        <Table className="table table-hover text-nowrap">
                          <TableHead className='bg-warning'>
                            <TableRow style={{ fontSize: '13px' }}>
                              <TableCell className='text-center'>Action</TableCell>
                              <TableCell className='text-center'>S.NO</TableCell>
                              <TableCell className='text-center'>TITLE</TableCell>
                              <TableCell className='text-center'>CODE</TableCell>
                              <TableCell className='text-center'>RESERVATION NAME</TableCell>
                              <TableCell className='text-center'>IMAGE</TableCell>
                              <TableCell className='text-center'>PRICEE RANGE</TableCell>
                              <TableCell className='text-center'>STATUS</TableCell>
                              <TableCell className='text-center'>CREATED AT</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className='text-center'>
                                  <Link to={`/UpdateCategory/${item.cat_id}`}>
                                    <EditIcon />
                                  </Link>
                                  <Link onClick={() => { handleOpenDeleteModal(item.cat_id) }}>
                                    <DeleteIcon />
                                  </Link>
                                </TableCell>
                                <TableCell className='text-center'>{index + 1}</TableCell>
                                <TableCell className='text-center'>{item.cat_title}</TableCell>
                                <TableCell className='text-center'>{item.reser_title}</TableCell>
                                <TableCell className='text-center'>{item.reser_cat_code}</TableCell>
                                <TableCell className='text-center' onClick={() => handleOpenModal(item.cat_image)}>
                                  <ImageIcon className='text-primary' />
                                </TableCell>
                                <TableCell className='text-center' style={{ whiteSpace: 'normal', width: '30%' }}>
                                  {item.price_range}
                                </TableCell>
                                <TableCell className={`text-center ${(item.status == "Active") ? "green" : ""}`}>{item.status}</TableCell>
                                <TableCell className='text-center'>{(item.created_at.slice(0, 10).split('-').reverse().join('-'))}</TableCell>
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
    </>
  );
}

export default ListCategory;


