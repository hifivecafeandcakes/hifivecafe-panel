import React, { useEffect, useState } from 'react';
import { Modal, Button } from "@mui/material"

const DeleteModel = ({ open, setOpen, deleteRecord, image }) => {

    // Function to close the modal
    const handleClose = () => {
        setOpen(false);
    };


    const deleteRecordConfirm = () => {
        setOpen(false);
        deleteRecord();
    };


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
                        width: '30%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        boxShadow: 24,
                        padding: 4,
                        borderRadius: 2,
                    }}
                >
                    <div>
                        <div className="modal-header">
                            {/* <h5 className="modal-title">Deleting record <span className='brown'>{this.state.title}</span></h5> */}
                            <Button className="close" variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
                                &times;
                            </Button>
                        </div>
                        <div className="modal-body" style={{padding:"20px"}}>
                            <h4>Are you want to delete?</h4>
                        </div>
                        <div className="modal-footer">
                            < button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={handleClose}>No</button>
                            <button type="button" className="btn btn-light" style={{marginLeft:"20px", backgroundColor:'red'}}
                                onClick={deleteRecordConfirm}>Yes</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModel;
