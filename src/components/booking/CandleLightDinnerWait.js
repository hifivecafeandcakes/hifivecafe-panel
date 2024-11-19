import React, { useEffect, useState } from 'react'
import wallpaper from '../../theme/assets/wallpaper.jpg';
import { Pagination, CircularProgress, TablePagination } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';

import Swal from 'sweetalert2';
import axios, { toFormData } from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import {TextField } from '@mui/material';
import Papa from "papaparse";
import { saveAs } from "file-saver";

const CandleLightDinnerWait = () => {
  

    const [fromDate, setFromDate] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([])
    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
      };
      const handleLastDateChange = (e) => {
        setLastDate(e.target.value);
    
      };
    
   
     

      const handleClick = (e) => {
        e.preventDefault(); // Corrected spelling
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}waiting/candle/light/dinner?fromdate=${fromDate}&todate=${lastDate}`)
          .then((res) => {
            let data = res.data; // Removed unnecessary optional chaining
          
            if (data.Response.Success==1) { // Used strict equality operator
              setResult(data.Response.Result);
              console.log(data.Response.Result);
            } else {
              Swal.fire({
                customClass: {
                  container: 'smaller-swal',
                },
                title:"NO DATA!",
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
      String(value.user_name)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.user_mobile)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.cat_title)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.sub_tilte)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.sub_cat_price_range)?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      String(value.date)?.toLowerCase().includes(searchInput?.toLowerCase())
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


  const transformData = (data) => {
  
    return data.map((item, i) => {
      const renamedItem = {
        S_NO: i + 1,
        USERNAME:item.user_name,
        MOBILE: item.user_mobile,
        ORDER_DATE:( item.date.slice(0, 10).split('-').reverse().join('-')),
        ORDER_TIME:item.time, 
        TOTAL_MEMBERS:item.total_people, 
        MENU:item.menu_type, 
        RESERVATION_TYPE:item.cat_title, 
        RESERVATION_CATEGORY:item.sub_tilte, 
        PRICE:item.sub_cat_price_range, 
        BOOKING_STATUS:(item.approval_status== 0?"WAITING":""), 
        PAYEMENT_STATUS:(item.payment_status== 0?"Un Paid":""), 
        BOOKING_DATE :(item.created_at.slice(0, 10).split('-').reverse().join('-')), 

      };

      return renamedItem;
    });
  };
  const transformedData = transformData(filteredData);
  const handleDownloadCSV = () => {
   
    Swal.fire({
      title: 'Download CSV',
      text: 'Are you sure you want to download the CSV file?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, download it!',
    }).then((result) => {
     
      if (result.isConfirmed) {
        const csv = Papa.unparse(transformedData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'Candle_light_dinner_waiting.csv');
      }
    });
  };


  const [paymentStatus, setPaymentStatus] = useState(0);

  const handleButtonClick = (reservationId) => {
    setPaymentStatus(1); 
    const formData = new FormData();
    formData.append('booking_id', reservationId); 
    formData.append('pstatus', 1); 
    console.log("booking_id", reservationId);
  


    axios
      .post(`${process.env.REACT_APP_API_URL}payment/status1`, formData)
      .then(function (res) {
        console.log("RESPONSE :", res.data);
        if (res.data.Response) {
          alert(res.data.Response.message);
        }
      })
      .catch((error) => {
        console.error('fetching error:', error);
      });
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
          <div className="card-header">
          <div className="container-fluid">
            <div className="card card-default mt-3">
              <div className="card-header ">
                <h3 className="card-title">
                 Candle Light Dinner Booking List
                </h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                  data-card-widget="remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>

              <div className="card-body d-flex" style={{ marginTop: '-1.5vh' }}>
                <div className='input-group mx-1'>
                    <TextField
                      label="From Date"
                      type="date"
                    className="form-control ml-2 mx-1 my-4"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleFromDateChange}
                    />
                  </div>
                <div className='input-group mx-1'>
                    <TextField
                      label="To Date"
                      type="date"
                    className="form-control ml-2 mx-1 my-4"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleLastDateChange}
                    />
                  </div>


              </div>
              <div className="card-footer">
                {loading == false?
            <button
                  className="btn btn-sm btn-primary mx-3"
                
                 onClick={handleClick}>
                  CLICK
                </button> :
                  <button
                    className="btn btn-sm btn-danger mx-3"
                  >
                    loading...
                  </button>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 my-3 px-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Candle Light Dinner Booking List</h3> <Button className='btn bg-primary ml-5' style={{fontSize:"10px"}} onClick={handleDownloadCSV}>csv</Button>
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
                        onChange={(e) => searchItems(e.target.value)}
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
                          <TableRow style={{ fontSize: '15px' }} >
                            <TableCell className='text-center'>S.NO</TableCell>


                            <TableCell className='text-center'>USERNAME</TableCell>

                            <TableCell className='text-center'>MOBILE</TableCell>

                            <TableCell className='text-center'> ORDER DATE & TIME </TableCell>

                            <TableCell className='text-center'>TOTAL MEMBERS</TableCell>
                            <TableCell className='text-center'>MENU</TableCell>

                            <TableCell className='text-center'>RESERVATION TYPE</TableCell>
                            <TableCell className='text-center'>RESERVATION CATEGORY</TableCell>
                            <TableCell className='text-center'>PRICE</TableCell>
                            <TableCell className='text-center'>BOOKING STATUS</TableCell>
                            <TableCell className='text-center'>PAYEMENT STATUS</TableCell>
                            <TableCell className='text-center'>BOOKING DATE </TableCell>
                          </TableRow>
                        </TableHead>



                        <TableBody>
                        {result.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className='text-center'>{index + 1}</TableCell>
                                {/* <TableCell className='text-center'>{item.reser_id}</TableCell> */}
                                <TableCell className='text-center'>{item.user_name}</TableCell>
                                <TableCell className='text-center'>{item.user_mobile}</TableCell>
                                <TableCell className='text-center'>
                                  <div><span>{(item.date.slice(0, 10).split('-').reverse().join('-'))}</span><br/>
                                  <span>{item.time}</span>
                                    </div></TableCell>
                                <TableCell className='text-center'>{item.total_people}</TableCell>
                                <TableCell className='text-center'>{item.menu_type}</TableCell>
                                <TableCell className='text-center'>{item.cat_title}</TableCell>
                                <TableCell className='text-center'>{item.sub_tilte}</TableCell>
                                <TableCell className='text-center'>{item.sub_cat_price_range}</TableCell>
                                <TableCell className='text-center'>{item.approval_status== 0?"WAITING":""}</TableCell>
                                <TableCell className='text-center'>
                                {paymentStatus === 0 ? (
        <button
          className='btn bg-primary'
          style={{ fontSize: "10px" }}
          onClick={() => handleButtonClick(item.booking_id)}
        >
          Unpaid
        </button>
      ) : (
        <button
        className='btn bg-primary'
        style={{ fontSize: "10px" }}
        onClick={() => handleButtonClick(item.booking_id)}
      >
        Unpaid
      </button>
      )}
    </TableCell>
                                <TableCell className='text-center'>{(item.created_at.slice(0, 10).split('-').reverse().join('-'))}</TableCell>
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
                  <p className='my-2 mx-3'>Total records: {totalRecords}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CandleLightDinnerWait