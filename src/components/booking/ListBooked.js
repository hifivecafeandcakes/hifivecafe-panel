import axios from "axios"
import { useEffect, useState } from "react"
// import Sidebar from "./Sidebar";
import "../../theme/assets/cart.css"
import { Link, useLocation } from "react-router-dom";
// import Status from "./reservation/Status";
// import Navbar from "./Navbar";
import { FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardHeader, Typography, CardContent, FormControl, TextField, CardActions, Button, InputAdornment, Input, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import ImageShowModel from "../reservation/ImageShowModel";
import BookingUpdate from "../reservation/BookingUpdate";


const Order = () => {

    const user_id = localStorage.getItem("user_id")

    //cart datas
    const [datas, setDatas] = useState([]);

    const location = useLocation();
    console.log(location.state)
    const { status } = location.state || { status: { msg: "", type: "success", toggle: "close" } }; // Access the passed data
    console.log(status)

    // status
    const empStatus = { msg: "", type: "success", toggle: "close" }
    const [status1, setStatus1] = useState(empStatus);

    useEffect(() => {
        getCardDetails();
    }, [])


    const [reservationList, setReservationList] = useState([]);
    const [reserId, setReserId] = useState('');


    const [selectedImage, setSelectedImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [updateID, setUpdateID] = useState(null);
    const [modalStatusOpen, setModalStatusOpen] = useState(false);


    const [categoryList, setCategoryList] = useState([]);
    const [CatID, setCatID] = useState('');


    const [customerList, setCustomerList] = useState([]);
    const [customerID, setCustomerID] = useState('');


    const [booked, setBooked] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [created, setCreated] = useState(0);
    const [cancelled, setCancelled] = useState(0);
    const [allStatus, setAllStatus] = useState(0);

    const [statusTab, setStatusTab] = useState('Booked'); // State to keep track of the active tab

    const [upcomingTab, setUpcomingTab] = useState('Today'); // State to keep track of the active tab

    const [pastTab, setPastTab] = useState(''); // State to keep track of the active tab

    useEffect(() => {
        if (status && status != null) {
            setStatus1(status);
        }
    }, [])


    const route_cat = (reser_id, res_cat_id) => {
        localStorage.setItem("reser_id", reser_id)
        localStorage.setItem("res_cat_id", res_cat_id)
    }


    const route_code = (v) => {
        localStorage.removeItem('res_code')
        localStorage.setItem("res_code", v)
    }

    useEffect(() => {
        reservationListSelect();
        customerListSelect();
    }, []);


    useEffect(() => { getCardDetails(); }, [reserId]);
    useEffect(() => { getCardDetails(); }, [CatID]);
    useEffect(() => { getCardDetails(); }, [customerID]);
    useEffect(() => { getCardDetails(); }, [statusTab]);
    useEffect(() => { getCardDetails(); }, [upcomingTab]);
    useEffect(() => { getCardDetails(); }, [pastTab]);


    const reservationListSelect = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/admin/reservation/select`)
            .then(function (res) {
                let data = res?.data;
                if (data?.Response.Success === '1') { setReservationList(data?.Response.result); }
                else {
                    setReserId('');
                    // Swal.fire({ icon: 'Success', title: 'Reservation Type Record Found', position: 'center' });
                }
            })
            .catch((error) => {
                setReserId('');
                // Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
            });
    }

    const categoryListSelect = (res_id) => {
        if (res_id == "") { res_id = 0 }

        axios
            .get(`${process.env.REACT_APP_API_URL}/admin/category/select/${res_id}`)
            .then(function (res) {
                let data = res?.data;
                if (data?.Response.Success === '1') { setCategoryList(data?.Response.result); }
                else {
                    setCatID('');
                    setCategoryList([]);
                    // Swal.fire({ icon: 'Success', title: 'Category Record Found', position: 'center' });
                }
            })
            .catch((error) => {
                setCatID('');
                setCategoryList([]);
                // Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
            });
    }


    const customerListSelect = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/admin/customer/select`)
            .then(function (res) {
                let data = res?.data;
                if (data?.Response.Success === '1') { setCustomerList(data?.Response.result); }
                else {
                    setCustomerID('');
                    // Swal.fire({ icon: 'Success', title: 'Customer Record Found', position: 'center' });
                }
            })
            .catch((error) => {
                setCustomerID('');
                // Swal.fire({ icon: 'Error', title: 'Error in Fetching', position: 'center' });
            });
    }


    const handleOpenModal1 = (reser_image) => {
        const array = []
        array.push(reser_image)

        console.log("array", array);
        setSelectedImage(array);
        // setSelectedImage(reser_image);
        setModalOpen(true);
    };

    const handleOpenModalStatus = (booking_id) => {
        setUpdateID(booking_id);
        setModalStatusOpen(true);
    };

    const handleReservationChange = (event) => {
        let resID = event.target.value;
        console.log("RES_TYPE :", resID);
        setReserId(resID)
        setCatID('')
        categoryListSelect(resID);
    };

    const handleCatChange = (event) => {
        const resID = event.target.value;
        setCatID(resID);
        console.log("Cat_ID :", resID);
    }

    const handleCustomerChange = (event) => {
        const cusID = event.target.value;
        setCustomerID(cusID);
        console.log("cusID :", cusID);
    }

    const changeStatusTab = (tabName) => {
        setStatusTab(tabName); // Set the active tab when a tab is clicked
    };

    const changeUpcomingTab = (tabName) => {
        setUpcomingTab(tabName); // Set the active tab when a tab is clicked
        setPastTab(''); // Set the active tab when a tab is clicked
    };

    const changePastTab = (tabName) => {
        setPastTab(tabName); // Set the active tab when a tab is clicked
        setUpcomingTab(''); // Set the active tab when a tab is clicked
    };

    async function getCardDetails() {
        try {
            const formData = new FormData();
            formData.append('statusTab', statusTab);

            formData.append('reserId', reserId);
            formData.append('CatID', CatID);

            formData.append('customerID', customerID);

            formData.append('upcomingTab', upcomingTab);
            formData.append('pastTab', pastTab);

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/reservation/booking/list`, formData)
            console.log("RESPONSE :", res.data);
            if (res?.data?.Response?.Success == '1') {
                let results = res?.data?.Response?.Result?.reservation_booking;
                console.log(results);
                setBooked(res?.data?.Response?.Result?.booked);
                setCreated(res?.data?.Response?.Result?.created);
                setCancelled(res?.data?.Response?.Result?.cancelled);
                setCompleted(res?.data?.Response?.Result?.completed);
                setAllStatus(res?.data?.Response?.Result?.allStatus);
                setDatas(results);
                setStatus1({ msg: "Order details get Successfully!", type: "success", toggle: "open" });
            } else {
                setBooked(res?.data?.Response?.Result?.booked);
                setCreated(res?.data?.Response?.Result?.created);
                setCancelled(res?.data?.Response?.Result?.cancelled);
                setCompleted(res?.data?.Response?.Result?.completed);
                setAllStatus(res?.data?.Response?.Result?.allStatus);
                setDatas([])
                setStatus1({ msg: "No Records Found", type: "error", toggle: "open" })
            }
        } catch (err) {
            setDatas([])
            setStatus1({ msg: "Error in fetching data. Try Again", type: "error", toggle: "open" })
            console.log('Fetching Error:', err);
        }
    }


    return (
        <>
            <div className='container-fluid cart-div'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='row'>
                            {/* <Navbar /> */}
                        </div>

                        <div className='row '>
                            <div className='col-lg-2 ' >
                                {/* <Sidebar /> */}
                            </div>

                            <div className='col-lg-10'>
                                <div className='container-fluid'>
                                    {/* <Status msg={status1.msg} type={status1.type} toggle={status1.toggle} onClose={() => setStatus1(empStatus)} /> */}

                                    <div className='cart-title'>
                                        <h1 className='text-center fs-24' style={{ color: 'orange' }}>Booked Orders</h1>
                                    </div>

                                    <div className="row">



                                        <div className='col-lg-12'>
                                            <div className="row">
                                                <div className="col-sm">

                                                    <div className="fs-16  white float-left pe-1 pt-3">
                                                        <h6 className="mob-fs-12">Booking Status </h6>
                                                    </div>

                                                    <div className="tab-app pt-4">
                                                        <div className="tabs mob-fs-10">

                                                            <div>
                                                                <button
                                                                    className={`tab-button mob-fs-10 mob-fs-10 ${statusTab === 'Booked' ? 'active' : ''}`}
                                                                    onClick={() => changeStatusTab('Booked')}
                                                                >
                                                                    Booked - {booked}
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    className={`tab-button mob-fs-10 ${statusTab === 'Completed' ? 'active' : ''}`}
                                                                    onClick={() => changeStatusTab('Completed')}
                                                                >
                                                                    Completed  - {completed}
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    className={`tab-button mob-fs-10 ${statusTab === 'Created' ? 'active' : ''}`}
                                                                    onClick={() => changeStatusTab('Created')}
                                                                >
                                                                    Failed - {created}
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    className={`tab-button mob-fs-10 ${statusTab === 'Cancelled' ? 'active' : ''}`}
                                                                    onClick={() => changeStatusTab('Cancelled')}
                                                                >
                                                                    Cancelled - {cancelled}
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    className={`tab-button mob-fs-10 ${statusTab === 'all' ? 'active' : ''}`}
                                                                    onClick={() => changeStatusTab('all')}
                                                                >
                                                                    Total - {allStatus}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="tabs">
                                                        <div className="w-30">
                                                            <FormControl fullWidth variant="outlined">
                                                                <InputLabel>Reservation Type</InputLabel>
                                                                <Select className="bg-light"
                                                                    value={reserId}
                                                                    required
                                                                    onChange={handleReservationChange}
                                                                    label="Sub-Category"
                                                                >
                                                                    <MenuItem value="">Reservation Type</MenuItem>
                                                                    {reservationList?.map((reservation, index) => (
                                                                        <MenuItem key={index} value={reservation.reser_id}>
                                                                            {reservation.reser_title}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className="w-30 ms-1">

                                                            <FormControl fullWidth variant="outlined" className='mb-1'>
                                                                <InputLabel>Category Type</InputLabel>
                                                                <Select className="bg-light"
                                                                    value={CatID}
                                                                    required
                                                                    onChange={handleCatChange}
                                                                    label="Sub-Category"
                                                                >
                                                                    <MenuItem value="">Category Type - All</MenuItem>
                                                                    {categoryList?.map((category, index) => (
                                                                        <MenuItem key={category.cat_id} value={category.cat_id}>
                                                                            {category.cat_title}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>

                                                        <div className="w-30 ms-1">

                                                            <FormControl fullWidth variant="outlined" className=''>
                                                                <InputLabel>Customer - All</InputLabel>
                                                                <Select className="bg-light"
                                                                    value={customerID}
                                                                    required
                                                                    onChange={handleCustomerChange}
                                                                    label="Customer"
                                                                >
                                                                    <MenuItem value="">Customer</MenuItem>
                                                                    {customerList?.map((customer, index) => (
                                                                        <MenuItem key={customer.id} value={customer.id}>
                                                                            {customer.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="col-sm">
                                                    <div className="events-div row">
                                                        <div className="col-sm">

                                                            <div className="fs-16 white float-left pe-1 pt-2">
                                                                <h6 className="mob-fs-12">Upcoming </h6>
                                                            </div>

                                                            <div className="tab-app pt-3">
                                                                <div className="tabs mob-fs-10">

                                                                    <div>
                                                                        <button className={`tab-button mob-fs-10 ${upcomingTab === 'Today' ? 'active' : ''}`} onClick={() =>
                                                                            changeUpcomingTab('Today')}
                                                                        >
                                                                            Today
                                                                        </button>
                                                                    </div>

                                                                    <div>
                                                                        <button className={`tab-button mob-fs-10 ${upcomingTab === 'Tomorrow' ? 'active' : ''}`} onClick={() =>
                                                                            changeUpcomingTab('Tomorrow')}
                                                                        >
                                                                            Tomorrow
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button className={`tab-button mob-fs-10 ${upcomingTab === 'Oneweek' ? 'active' : ''}`} onClick={() =>
                                                                            changeUpcomingTab('Oneweek')}
                                                                        >
                                                                            One Week
                                                                        </button>
                                                                    </div>
                                                                    {/* <div>
                                                            <button className={`tab-button mob-fs-10 ${upcomingTab === 'Twoweek' ? 'active' : ''}`} onClick={() =>
                                                                changeUpcomingTab('Twoweek')}
                                                            >
                                                                Two Weeks
                                                            </button>
                                                        </div> */}
                                                                    <div>
                                                                        <button className={`tab-button mob-fs-10 ${upcomingTab === 'Onemonth' ? 'active' : ''}`} onClick={() =>
                                                                            changeUpcomingTab('Onemonth')}
                                                                        >
                                                                            One Month
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button className={`tab-button mob-fs-10 ${upcomingTab === 'all' ? 'active' : ''}`} onClick={() =>
                                                                            changeUpcomingTab('all')}
                                                                        >
                                                                            Upcoming All
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                            <div className="fs-16 white float-left pe-1">
                                                                <h6 className="mob-fs-12">Past </h6>
                                                            </div>

                                                            <div className="tab-app mt-1">
                                                                <div className="tabs mob-fs-10">

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
                                                                    {/* <div>
                                                            <button className={`tab-button mob-fs-10 ${pastTab === 'Twoweek' ? 'active' : ''}`} onClick={() =>
                                                                changePastTab('Twoweek')}
                                                            >
                                                                Past Two Weeks
                                                            </button>
                                                        </div> */}
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
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>


                                        </div>
                                    </div>


                                    <div className='cart-head'>

                                        {(datas.length > 0) ?
                                            <>
                                                {datas.map((data, index) => (
                                                    <>
                                                        <div key={`cart` + index} className="row cart-row cart-border ">
                                                            <div class="overlay">{index + 1}</div>


                                                            <div className={data.reser_code === "BP" ? "col-lg-2 text-center" : "col-lg-2 text-center"}>
                                                                <div className="mt-5 mob-mt-20">
                                                                    <img src={data.sub_img} onClick={() => { handleOpenModal1(data.sub_img) }} className="sub-img" alt={data.sub_tilte}></img>
                                                                    <Link to="#" onClick={() => { route_cat(data.reser_id, data.reser_cat_id); route_code(data.reser_code); }} className="sub-cat-part text-center">
                                                                        <div className="">{data.reser_main_title}&nbsp;-&nbsp;{data.cat_title}</div>
                                                                        <h6 className="white">{data.sub_tilte}
                                                                            {(data.reser_code == "TB") ? "" :
                                                                                <span className="green">
                                                                                    &nbsp;-&nbsp;&#8377;{data.sub_cat_price_range}
                                                                                </span>
                                                                            }
                                                                        </h6>
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                            {(data.reser_code == "CL") ?
                                                                <div className="col-lg-2 mt-5 text-center ">
                                                                    {
                                                                        data.booking_veg_or_nonveg === "Veg" ? (
                                                                            data && data.veg_images && data.veg_images[parseInt(data.booking_menu_type) - parseInt(1)] !== undefined ? (
                                                                                <>
                                                                                    <img
                                                                                        src={data.veg_images[parseInt(data.booking_menu_type) - parseInt(1)]}
                                                                                        className="sub-img"
                                                                                        onClick={() => handleOpenModal1(data.veg_images[parseInt(data.booking_menu_type) - parseInt(1)])}
                                                                                        alt={data.booking_menu_type} // Adding alt text for accessibility
                                                                                    />
                                                                                </>
                                                                            ) : ""
                                                                        ) : (
                                                                            data && data.nonveg_images && data.nonveg_images[parseInt(data.booking_menu_type) - parseInt(1)] !== undefined ? (
                                                                                <>
                                                                                    <img
                                                                                        src={data.nonveg_images[parseInt(data.booking_menu_type) - parseInt(1)]}
                                                                                        className="sub-img"
                                                                                        onClick={() => handleOpenModal1(data.veg_images[parseInt(data.booking_menu_type) - parseInt(1)])}
                                                                                        alt={data.booking_menu_type} // Adding alt text for accessibility
                                                                                    />
                                                                                </>
                                                                            ) : ""
                                                                        )
                                                                    }

                                                                    {
                                                                        data.booking_veg_or_nonveg === "Veg" ? (
                                                                            data.veg_menus && data.veg_menus[parseInt(data.booking_menu_type) - parseInt(1)] !== undefined ? (
                                                                                <>
                                                                                    <div className="cart-label"><div className="cart-label1">Food Menu:</div>{data.veg_menus[parseInt(data.booking_menu_type) - parseInt(1)]}</div>
                                                                                </>
                                                                            ) : ""
                                                                        ) : (
                                                                            data.nonveg_menus && data.nonveg_menus[parseInt(data.booking_menu_type) - parseInt(1)] !== undefined ? (
                                                                                <>
                                                                                    <div className="cart-label"><div className="cart-label1">Food Menu:</div>{data.nonveg_menus[parseInt(data.booking_menu_type) - parseInt(1)]}</div>
                                                                                </>
                                                                            ) : ""
                                                                        )
                                                                    }
                                                                    <div className="cart-label "><div className="cart-label1 ">Food Type:</div> {(data.booking_veg_or_nonveg == "Veg") ? "Veg" : "Non-Veg"} </div>

                                                                </div> :
                                                                <div className="col-lg-2 mt-5 text-center "></div>

                                                            }



                                                            <div className="col-lg-3">
                                                                {/* <div className="sub-cat-part white"> */}
                                                                <div>
                                                                    <div className="cart-label"><div className="cart-label1">Guest Name / Whatsapp No::</div> &nbsp;{data.booking_guest_name} /&nbsp;{(data.booking_guest_whatsapp == "") ? "-" : data.booking_guest_whatsapp}</div>
                                                                    <div className="cart-label"><div className="cart-label1">Total People:</div> &nbsp;{data.booking_total_people}</div>
                                                                    {/* </div>
                                                                    <div className="ps-2 "> */}
                                                                    {(data.booking_cake == "" || data.booking_cake == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Cake:</div>&nbsp;{(data.booking_cake == "") ? "-" : data.booking_cake}</div>
                                                                    }
                                                                    {(data.booking_cake_msg == "" || data.booking_cake_msg == null) ? "" :

                                                                        <div className="cart-label"><div className="cart-label1">Cake Message:</div>&nbsp;{(data.booking_cake_msg == "") ? "-" : data.booking_cake_msg}</div>
                                                                    }
                                                                    {(data.booking_cake_shape == "" || data.booking_cake_shape == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Cake Shape:</div>&nbsp; {data.booking_cake_shape} - <span className="green">₹{data.booking_cakeShapePrice}</span> </div>
                                                                    }
                                                                    {(data.booking_cake_weight == "" || data.booking_cake_weight == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Cake Weight:</div>&nbsp; {data.booking_cake_weight}</div>
                                                                    }
                                                                    {(data.balloon_theme == "" || data.balloon_theme == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Balloon Theme:</div>&nbsp;{(data.balloon_theme == "") ? "-" : data.balloon_theme}</div>
                                                                    }
                                                                    {/* </div> */}



                                                                </div>
                                                            </div>

                                                            <div className="col-lg-2">
                                                                {/* <div className="sub-cat-part white"> */}
                                                                <div>
                                                                    {(data.is_led == "No" || data.is_led == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">LED Name:</div>&nbsp;
                                                                            {data.ledName} - <span className="green">₹{data.ledPrice}</span>
                                                                        </div>
                                                                    }
                                                                    {(data.is_age == "No" || data.is_age == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">LED Age:</div>&nbsp;
                                                                            {data.ageName} - <span className="green">₹{data.agePrice}</span>
                                                                        </div>
                                                                    }
                                                                    {(data.photoShoot == "" || data.photoShoot == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Photo Shoot:</div>&nbsp;
                                                                            {data.photoShoot} - <span className="green">₹{data.photoShootPrice}</span>
                                                                        </div>
                                                                    }

                                                                    {(data.photoPrint == "" || data.photoPrint == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Photo Print:</div>&nbsp;
                                                                            {data.photoPrint} - <span className="green">₹{data.photoPrintPrice}</span>
                                                                        </div>
                                                                    }

                                                                    {(data.flower == "" || data.flower == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Flower Bouquet:</div>&nbsp;
                                                                            {data.flower} - <span className="green">₹{data.flowerPrice}</span>
                                                                        </div>
                                                                    }

                                                                    {(data.fire == "" || data.fire == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Fire Crackers:</div>&nbsp;
                                                                            {data.fire} - <span className="green">₹{data.firePrice}</span>
                                                                        </div>
                                                                    }

                                                                    {(data.remarks == "" || data.remarks == null) ? "" :
                                                                        <div className="cart-label"><div className="cart-label1">Additional comment:</div>&nbsp;
                                                                            {data.remarks}
                                                                        </div>
                                                                    }

                                                                </div>
                                                            </div>

                                                            <div className="col-lg-3">

                                                                <div> <span className={`buttioning bg-red fs-14`} onClick={() => { handleOpenModalStatus(data.booking_item_id) }}>
                                                                    View / Update Booking Status
                                                                </span></div>
                                                                <div className="cart-label"><div className="cart-label1">Booking Id:</div><span className="brown booking_id fs-18">{data.booking_id}</span></div>
                                                                <div className="cart-label"><div className="cart-label1">Booking At:</div><span className="greenyellow fs-20">{data.booking_date}&nbsp;{data.booking_time_slot}</span></div>
                                                                <div className="cart-label"><div className="cart-label1">Booking By:</div>{data.user_name} - {data.user_mobile}</div>
                                                                {(data.reser_code == "TB") ? "" :
                                                                    <>
                                                                        <div className="cart-label"><div className="cart-label1">Paid status:</div><span className={data.booking_payment_status ? data.booking_payment_status : 'red'}>
                                                                            {(data.booking_payment_status) ? data.booking_payment_status : "Not Paid"}</span></div>
                                                                        <div className="cart-label"><div className="cart-label1">Total Amount / Paid Total Amount:</div>
                                                                            <span className={`fs-16 green`}>
                                                                                ₹{data.total_amount} /
                                                                            </span>
                                                                            <span className={`fs-16 ${data.booking_payment_status ? data.booking_payment_status : 'red'}`}>
                                                                                &nbsp;₹{(data.booking_payment_amount) ? data.booking_payment_amount : "0.00"}
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                }
                                                                <div className="cart-label"><div className="cart-label1">Booking Current status:</div>
                                                                    <span className={`buttioning ${(data.booking_status == "Created") ? 'bg-grey' : 'bg-green'}`}>
                                                                        {(data.booking_status == "Created" ? "Booking Failed" : data.booking_status)}
                                                                    </span>
                                                                </div>
                                                                <div style={{ float: 'right' }}>
                                                                    <div className="cart-label"><div className="cart-label1">Submitted Date:</div>{data.booking_created_at}</div>
                                                                </div>
                                                            </div>
                                                            {
                                                                (data.booking_status == "Booked" || statusTab == "Completed") ? "" :
                                                                    <div className={"col-lg-12 fs-14 red text-center"}>
                                                                        Booking for this event failed due to {(data.booking_payment_status == "success") ? 'network issue' : 'payment failed'}. To rebook the same event, please contact Hifive - {process.env.REACT_APP_CALL_NUMBER}
                                                                    </div>
                                                            }
                                                        </div >
                                                    </>
                                                ))}
                                            </>
                                            : <h3 className="text-center">No Record Found</h3>}
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
            </div >

            <ImageShowModel open={modalOpen} setOpen={setModalOpen} image={selectedImage} />
            <BookingUpdate open={modalStatusOpen} setOpen={(trd) => { setModalStatusOpen(trd); getCardDetails(); }} booking_id={updateID} />

        </>
    )
}

export default Order