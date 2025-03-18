import React, { useEffect, useState } from 'react';
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { Pagination, CircularProgress, TablePagination, TextField } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Modal } from '@mui/material';
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
import "slick-carousel/slick/slick-theme.css"; import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ImageShowModel from '../reservation/ImageShowModel';
import DeleteModel from '../reservation/DeleteModel';

const ListVisitor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedExtraImage, setSelectedExtraImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenExtraImg, setModalOpenExtraImg] = useState(false);
  const [modalOpenVideo, setModalOpenVideo] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEncryptId, setDeleteEncryptId] = useState("");

  const navigate = useNavigate();

  // State for pagination
  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const [pastTab, setPastTab] = useState('Today');

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



  useEffect(() => {
    getVisitorDetails();
  }, []);

  async function getVisitorDetails() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('pastTab', pastTab);

      axios.post(`${process.env.REACT_APP_API_URL}/admin/visitor/list`, formData)
        .then((res) => {
          let data = res?.data;
          if (data?.Response.Success == "1") {
            let dataPagination_result = data?.Response.result
            setResult(dataPagination_result);
            console.log(dataPagination_result);
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

    } catch (err) {
      console.log('Fetching Error:', err);
    }
  }


  const changePastTab = (tabName) => {
    setPastTab(tabName); // Set the active tab when a tab is clicked
  };


  useEffect(() => { getVisitorDetails(); }, [pastTab]);


  const handleOpenModal = (imageUrls) => {
    if (imageUrls.length > 0) {
      setSelectedExtraImage(imageUrls);
      setModalOpenExtraImg(true);
    }
  };

  const handleOpenModal1 = (reser_image) => {
    const array = []
    array.push(reser_image)

    console.log("array", array);
    setSelectedImage(array);
    // setSelectedImage(reser_image);
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (deleting_id) => {
    console.log(deleting_id);
    setDeleteEncryptId(deleting_id);
    setDeleteModalOpen(true);
  };

  const handleDeleteRecord = (e) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/customer/delete/${deleteEncryptId}`)
      .then(function (res) {
        let data = res?.data;
        console.log(res.data);
        if (data?.Response.Success === '1') {
          Swal.fire({ icon: 'success', title: 'Record Deleted Successfully', position: 'center' });
          setDeleteEncryptId("")
          setTimeout(() => { window.location.reload(); }, 2000);
        } else {
          Swal.fire({ icon: 'error', title: 'Record Deleted Unsuccessfully', position: 'center' });
          setDeleteEncryptId("")
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({ icon: 'Error', title: 'Error in Deleting', position: 'center' });
        setDeleteEncryptId("")
      });
  };

  const handleCloseModalVideo = () => {
    setModalOpenVideo(false);
  };

  const filteredData = result.filter(
    (row) => {
      const queryLower = searchQuery.toLowerCase();
      return (
        (!row.user_name || row.user_name.toLowerCase().includes(queryLower)) ||
        (!row.user_mobile || row.user_mobile.toLowerCase().includes(queryLower)) ||
        (!row.user_email || row.user_email.toLowerCase().includes(queryLower))
      );

    }
  );
  // (row.user_name != "" && row.user_name != null) ? row.user_name.toLowerCase().includes(searchQuery.toLowerCase()) : row ||
  //   (row.user_mobile != "" && row.user_mobile != null) ? row.user_mobile.toLowerCase().includes(searchQuery.toLowerCase()) : row ||
  //     (row.user_email != "" && row.user_email != null) ? row.user_email.toLowerCase().includes(searchQuery) : row

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
                  <h3 className="card-title">Visitor List</h3>

                  <div className="tab-app mt-1">
                    <div className="tabs-visitor mt-3 mob-fs-10">

                      <div>
                        <button className={`tab-button mob-fs-10 ${pastTab === 'Today' ? 'active' : ''}`} onClick={() =>
                          changePastTab('Today')}
                        >
                          Today
                        </button>
                      </div>
                      <div>
                        <button className={`tab-button mob-fs-10 ${pastTab === 'Yesterday' ? 'active' : ''}`} onClick={() =>
                          changePastTab('Yesterday')}
                        >
                          Yesterday
                        </button>
                      </div>
                      <div>
                        <button className={`tab-button mob-fs-10 ${pastTab === 'Oneweek' ? 'active' : ''}`} onClick={() =>
                          changePastTab('Oneweek')}
                        >
                          Past One Week
                        </button>
                      </div>
                      <div>
                        <button className={`tab-button mob-fs-10 ${pastTab === 'Onemonth' ? 'active' : ''}`} onClick={() =>
                          changePastTab('Onemonth')}
                        >
                          Past One Month
                        </button>
                      </div>
                      <div>
                        <button className={`tab-button mob-fs-10 ${pastTab === 'all' ? 'active' : ''}`} onClick={() =>
                          changePastTab('all')}
                        >
                          Past All
                        </button>
                      </div>
                    </div>
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
                      {/* <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '20px', padding: '10px' }}
                      /> */}

                      <TableContainer component={Paper}>
                        <Table className="table table-hover text-nowrap">
                          <TableHead className='bg-warning'>
                            <TableRow style={{ fontSize: '13px' }}>
                              <TableCell className='text-center'>Action</TableCell>
                              <TableCell className='text-center'>S.NO</TableCell>
                              <TableCell className='text-center'>IP</TableCell>
                              <TableCell className='text-center'>Page</TableCell>
                              <TableCell className='text-center'>User Name</TableCell>
                              <TableCell className='text-center'>User Email</TableCell>
                              <TableCell className='text-center'>User Mobile</TableCell>
                              <TableCell className='text-center'>CREATED AT</TableCell>
                              <TableCell className='text-center'>Browser</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className='text-center'>
                                  <Link to={`/UpdateCustomer/${item.id}`}><EditIcon /></Link>
                                  <Link onClick={() => { handleOpenDeleteModal(item.id) }}><DeleteIcon /></Link>
                                </TableCell>
                                <TableCell className='text-center'>{index + 1}</TableCell>
                                <TableCell className='text-center'>{item.ip}</TableCell>
                                <TableCell className='text-center'>{item.page}</TableCell>
                                <TableCell className='text-center'>{item.user_name}</TableCell>
                                <TableCell className='text-center'>{item.user_email}</TableCell>
                                <TableCell className='text-center'>{item.user_mobile}</TableCell>
                                <TableCell className='text-center'>{item.created_at}</TableCell>
                                <TableCell className='text-center'>{item.browser}</TableCell>
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

export default ListVisitor;


