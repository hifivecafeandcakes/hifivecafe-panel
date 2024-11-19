import React, { useEffect, useState } from 'react';
import { Modal, Button } from "@mui/material"

const ImageShowModel = ({ open, setOpen, image }) => {

    // Function to close the modal
    const handleClose = () => {
        setOpen(false);
    };

    console.log(image);

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
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,

                    }}
                >
                    <Button className="close" variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
                        &times;
                    </Button>
                    <div>
                        {
                            (typeof image === 'string') ?
                                image && (
                                    <img style={{
                                        maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', justifySelf: 'center', objectFit: 'scale-down',
                                        display: 'block',
                                    }}
                                        src={(typeof image === "string") ? image : URL.createObjectURL(image)}
                                        alt="" />
                                ) :
                                image && (
                                    <img style={{
                                        maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', justifySelf: 'center', objectFit: 'scale-down',
                                        display: 'block',
                                    }}
                                        src={(typeof image[0] === "string") ? image[0] : URL.createObjectURL(image)}
                                        alt="" />
                                )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ImageShowModel;
