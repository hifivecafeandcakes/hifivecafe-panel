import axios from "axios"
import { useEffect, useState } from "react"
// import Sidebar from "./Sidebar";
import { Navbar } from "react-bootstrap";
import "../../theme/assets/cart.css"
import { Link, useLocation } from "react-router-dom";
// import Status from "./reservation/Status";


const ListBooked = () => {

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


    useEffect(() => {
        if (status && status != null) {
            setStatus1(status);
        }
    }, [])


    const route_cat = (reser_id, res_cat_id) => {
        localStorage.setItem("reser_id", reser_id)
        localStorage.setItem("res_cat_id", res_cat_id)
    }


    async function getCardDetails() {
        try {
            const formData = new FormData();
            formData.append('userid', user_id);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/reservation/booking/list`, formData)

            console.log("RESPONSE :", res.data);
            if (res?.data?.Response?.Success == '1') {
                let results = res?.data?.Response?.Result;
                console.log(results);
                setDatas(results)
                setStatus1({ msg: "Order details get Successfully!", type: "success", toggle: "open" });
            } else {
                setDatas([])
                setStatus1({ msg: "Error in fetching data", type: "error", toggle: "open" })
                console.log('Execution Error');
            }
        } catch (err) {
            setDatas([])
            setStatus1({ msg: "Error in fetching data. Try Again", type: "error", toggle: "open" })
            console.log('Fetching Error:', err);
        }
    }


    return (
        <>
            <div className='content-wrapper cart-div'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card'>
                            <div className="card-header">
                                <h3 className="card-title">Booked Board</h3>
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
                                           
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                {(datas.length > 0) ?
                                    <>
                                        {datas.map((data, index) => (
                                            <>
                                                <div key={`cart` + index} className="row cart-row cart-border ">
                                                    <div className={data.reser_code === "BP" ? "col-lg-2" : "col-lg-2"}>
                                                        <div className="mt-5">
                                                            <img src={data.sub_img} className="sub-img" alt={data.sub_tilte}></img>
                                                            <Link to="/sub_cat_list" onClick={() => route_cat(data.reser_id, data.reser_cat_id)} className="sub-cat-part text-center">
                                                                <div className="">{data.reser_main_title}&nbsp;-&nbsp;{data.cat_title}</div>
                                                                <h6 className="grey">{data.sub_tilte}
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
                                                        <div className="col-lg-2 mt-5 text-center">
                                                            {
                                                                data.booking_veg_or_nonveg === "Veg" ? (
                                                                    data && data.veg_images && data.veg_images[parseInt(data.booking_menu_type) - parseInt(1)] !== undefined ? (
                                                                        <>
                                                                            <img
                                                                                src={data.veg_images[parseInt(data.booking_menu_type) - parseInt(1)]}
                                                                                className="sub-img"
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
                                                            <div className="cart-label"><div className="cart-label1">Food Type:</div> {(data.booking_veg_or_nonveg == "Veg") ? "Veg" : "Non-Veg"} </div>

                                                        </div> :
                                                        <div className="col-lg-2 mt-5 text-center"></div>

                                                    }



                                                    <div className="col-lg-3">
                                                        {/* <div className="sub-cat-part grey"> */}
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
                                                        {/* <div className="sub-cat-part grey"> */}
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



                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3">
                                                        <div className="cart-label"><div className="cart-label1">Booking Id:</div><span className="brown fs-18">{data.booking_id}</span></div>
                                                        <div className="cart-label"><div className="cart-label1">Booking At:</div><span className="greenyellow fs-18">{data.booking_date}&nbsp;{data.booking_time_slot}</span></div>
                                                        <div className="cart-label"><div className="cart-label1">Booking By:</div>{data.user_name} - {data.user_mobile}</div>
                                                        {(data.reser_code == "TB") ? "" :
                                                            <>
                                                                <div className="cart-label"><div className="cart-label1">Paid status:</div><span className={`${data.booking_payment_status}`}>
                                                                    {(data.booking_payment_status) ? data.booking_payment_status : "Not Paid"}</span></div>
                                                                <div className="cart-label"><div className="cart-label1">Paid Total Amount:</div>{(data.booking_payment_amount) ? <span className="green fs-16">₹{data.booking_payment_amount}</span> : "0.00"}</div>
                                                            </>
                                                        }
                                                        <div className="cart-label"><div className="cart-label1">Booking Current status:</div>{data.booking_status}</div>
                                                        <div style={{ float: 'right' }}>
                                                            <div className="cart-label"><div className="cart-label1">Submitted Date:</div>{data.booking_created_at}</div>
                                                        </div>
                                                    </div>


                                                </div >
                                            </>
                                        ))}
                                    </>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ListBooked