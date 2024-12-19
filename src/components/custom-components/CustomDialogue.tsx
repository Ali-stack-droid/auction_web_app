import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React from 'react'

const CustomDialogue = ({ confirmDelete, handleCloseModal, handleConfirmDelete }: any) => {
    return (
        <Dialog open={confirmDelete} onClose={handleCloseModal} >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this auction? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog >
    )
};

export default CustomDialogue