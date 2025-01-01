import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React from 'react'

const CustomDialogue = ({ type, title, message, openDialogue, handleCloseModal, handleConfirmDelete }: any) => {
    return (
        <Dialog open={openDialogue} onClose={handleCloseModal} >
            <DialogTitle>
                {title}
                {/* {type === "delete" ? "Confirm Deletion" : "Confirm Submission"} */}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: "20px", gap: 1 }}>
                <Button
                    variant={'outlined'}
                    sx={{ textTransform: 'none' }}
                    onClick={handleCloseModal}
                    color={"primary"}
                >
                    {type === "delete" ? "Cancel" : "No"}

                </Button>
                <Button
                    variant={'contained'}
                    sx={{ textTransform: 'none', }}
                    onClick={handleConfirmDelete}
                    color={type === "delete" ? "error" : "primary"}
                    autoFocus
                >
                    {type === "delete" ? "Delete" : "Yes"}

                </Button>

            </DialogActions>
        </Dialog >
    )
};

export default CustomDialogue