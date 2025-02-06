import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Button, InputLabel, Select, MenuItem, Modal } from '@mui/material';
import axios from "axios"

import Swal from 'sweetalert2';

const BookingUpdate = ({ open, setOpen, booking_id }) => {

    // Function to close the modal
    const handleClose = () => {
        setComment('');
        setOpen(false);
    };



    const statusArray = [
        { key: 'Booked', value: 'Booked' },
        { key: 'Completed', value: 'Completed' },
        { key: 'Created', value: 'Created/Failed' },
        { key: 'Cancelled', value: 'Cancelled' }
    ];


    const [status, setStatus] = useState('');
    const [adminId, setAdminId] = useState('');
    const [comment, setComment] = useState('');
    const [booking, setBooking] = useState('');
    const [bookingId, setBookingId] = useState(booking_id);


    const handleStatusChange = (event) => {
        let status = event.target.value;
        console.log("RES_TYPE :", status);
        setStatus(status);
    };

    useEffect(() => {
        console.log(booking_id);
        console.log("booking_id");
        setBookingId(booking_id)
        if (booking_id != null && booking_id != "" && open) { getBookingData(); }
    }, [open]);


    useEffect(() => {
        setAdminId(localStorage.getItem("admin_id"))
    }, []);



    const getBookingData = () => {
        console.log("bookingId");
        console.log(bookingId);
        console.log(adminId);
        axios
            .get(`${process.env.REACT_APP_API_URL}/admin/reservation/booking/get/${booking_id}`)
            .then(function (res) {
                let data = res?.data;
                console.log(data);
                if (data?.Response.Success === '1') { setBooking(data?.Response?.Result[0]); setStatus(data?.Response?.Result[0].booking_status) }
                else {
                    setBooking([]);
                    Swal.fire({ icon: 'Success', title: 'Detail not Found', position: 'center' });
                    handleClose();
                }
            })
            .catch((error) => {
                setBooking([]);
                console.log(error);
                Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
                handleClose();
            });
    }


    async function handleUpdate() {
        try {
            const formData = new FormData();
            formData.append('status', status);

            console.log(adminId);
            formData.append('user_id', adminId);
            formData.append('booking_id', bookingId);

            formData.append('comment', comment);

            setComment('');

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/reservation/booking/update`, formData)
            console.log("RESPONSE :", res.data);
            if (res?.data?.Response?.Success == '1') {
                Swal.fire({ icon: 'Success', title: res?.data?.Response?.message, position: 'center' });
                handleClose();
            } else {
                Swal.fire({ icon: 'Error', title: res?.data?.Response?.message, position: 'center' });
            }
        } catch (err) {
            Swal.fire({ icon: 'Error', title: "Error in fetching data. Try Again", position: 'center' });
            console.log('Fetching Error:', err);
            handleClose();
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal-content"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxHeight: '100vh',
                        bgcolor: 'white',
                        border: '2px solid #000',
                        boxShadow: 24,
                    }}
                >



                    <div className='row'>
                        <div className='col-sm'>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select className="bg-light"
                                    value={booking.booking_status}
                                    // value={status}
                                    required
                                    onChange={handleStatusChange}
                                    label="Sub-Category"
                                >
                                    <MenuItem value=""></MenuItem>
                                    {statusArray?.map((sts, index) => (
                                        <MenuItem key={sts.key} value={sts.key}>
                                            {sts.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Comment"
                                    fullWidth
                                    margin="normal"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </FormControl>
                            <div className='d-flex'>
                                <span className={`buttioning bg-grey w-80`} onClick={() => handleClose()}>
                                    Close
                                </span>
                                <span className={`buttioning bg-green w-80`} onClick={() => handleUpdate()}>
                                    Update
                                </span>
                            </div>
                        </div>
                        <div className='col-sm'>
                            <h5>Customer </h5>
                            {(booking?.customer_status_comments?.length > 0) && booking.customer_status_comments?.map((sts, index) => (

                                <h6 className='fs-14'>({sts.name}-{sts.customer_id}-{sts.mobile}) have
                                    <span className='fs-14 green'> {sts.status}</span>
                                    <br /><span className='fs-10 grey'> {sts.created_at}</span></h6>
                            ))}
                            <br />

                            <h5>Admin </h5>
                            {(booking?.admin_status_comments?.length > 0) && booking.admin_status_comments?.map((sts, index) => (

                                <h6 className='fs-14'>({sts.name}-{sts.admin_id}-{sts.mobile}) have changed status to
                                    <span className='fs-14 green'> {sts.status}</span>
                                    {(sts.comment != "") ? <><br /><span className='fs-12 blue'> {sts.comment}</span></> : ""}
                                    <br /><span className='fs-10 grey'> {sts.created_at}</span></h6>
                            ))}

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default BookingUpdate;
