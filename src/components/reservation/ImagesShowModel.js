import React, { useEffect, useState } from 'react';
import { Modal, Button } from "@mui/material"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImagesShowModel = ({ open, setOpen, images }) => {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // Function to close the modal
    const handleClose = () => {
        setOpen(false);
    };

    // console.log(images);


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
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        bgcolor: 'background.paper',
                        border: '3px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Button className="close" variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
                        &times;
                    </Button>
                    <div>
                        {images && (
                            <Slider {...sliderSettings}>
                                {images?.map((image, index) => (
                                    <div key={index}
                                        style={{ marginTop: '-4vh' }}>
                                        <img
                                            style={{
                                                width: '90%',
                                                height: '90%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                alignSelf: 'center',
                                                // objectFit: 'fill',
                                                objectFit: 'scale-down',
                                                display: 'block',
                                            }}
                                            src={(typeof image==="string")?image:URL.createObjectURL(image)}
                                            alt={`Extra Image ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ImagesShowModel;
