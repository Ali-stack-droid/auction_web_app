import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React from 'react'

const CustomDialogue = ({ type, openDialogue, handleCloseModal, handleConfirmDelete }: any) => {
    return (
        <Dialog open={openDialogue} onClose={handleCloseModal} >
            <DialogTitle>
                {type === "delete" ? "Confirm Deletion" : "Confirm Submission"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {type === "delete" ? "Are you sure you want to delete this auction? This action cannot be undone."
                        : "Do you want to create the auction without adding lots?"}

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