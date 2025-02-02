import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'; // Import dropzone hook
import { Box, Typography, Button, Paper } from '@mui/material';
import theme from '../../theme';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import { ErrorMessage } from '../../utils/ToastMessages';

const ImageUploader = ({ file, setFile }: any) => {

    const [borderColor, setBorderColor] = useState(theme.palette.primary.main4); // Default border color

    const [fileSize, setFileSize] = useState(0);

    const onDrop = (acceptedFiles: File[]) => {
        const allowedExtensions = ['.jpg', '.png'];

        const filteredFiles = acceptedFiles.filter((file) => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            return ext && allowedExtensions.includes(`.${ext}`);
        });

        if (filteredFiles.length > 0) {
            setFile(filteredFiles[0]);
            setFileSize(filteredFiles[0].size);
        } else {
            ErrorMessage('Only JPG and PNG files are allowed.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpg'], 'image/png': ['.png'] }, // Keep MIME types but don't rely on them
        maxSize: 25 * 1024 * 1024, // Max file size 25MB
        onDragEnter: () => setBorderColor(theme.palette.primary.main), // Blue border when dragging
        onDragLeave: () => setBorderColor(theme.palette.primary.main4), // Reset border color
    });

    const formatSize = (size: any) => {
        // Format size in KB/MB
        if (size >= 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(2) + ' MB';
        }
        return (size / 1024).toFixed(2) + ' KB';
    };

    return (
        <Box>
            <Box
                {...getRootProps()}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    border: `1px solid ${borderColor}`,
                    padding: '15px 0',
                    textAlign: 'center',
                    cursor: 'pointer',
                    minHeight: '150px',
                    borderRadius: '15px',
                    opacity: '0.9',
                }}
            >
                <input {...getInputProps()} />
                {file ? (
                    <Box>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                        <Typography>
                            Size:  {formatSize(fileSize)}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <PublishRoundedIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography sx={{ fontSize: "12px", color: theme.palette.primary.main1 }}>
                            Drag and drop your JPG or PNG images here.
                        </Typography>
                        <Button variant="contained" sx={{ fontSize: "12px", mt: 1, textTransform: 'none' }}>Upload JPG Files Here</Button>
                        <Typography sx={{ fontSize: "12px", color: theme.palette.primary.main1, fontWeight: 600 }} mt={1}>
                            Maximum file size is: 25 MB
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ImageUploader;
