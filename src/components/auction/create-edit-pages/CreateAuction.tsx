import { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Button,
    MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../custom-components/CustomTextField';
import { useCreateAuctionStyles } from './CreateAuctionStyles';
import ImageUploader from '../../custom-components/ImageUploader';
import { CustomMultiLineTextField } from '../../custom-components/CustomMultiLineTextField';
import CustomDialogue from '../../custom-components/CustomDialogue';
import { useNavigate } from 'react-router-dom';

const CreateAuction = ({ setIsContinue, setAuctionData, file, setFile }: any) => {
    const classes = useCreateAuctionStyles();
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);
    const navigate = useNavigate()

    const [submissionAttempt, setSubmissionAttempt] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            auctionId: '',
            auctionName: '',
            auctionType: 'Current',
            auctionImage: '',
            description: '',
            liveStreaming: false,
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            checkoutDate: '',
            checkoutTime: '',
            auctionPreviewStartDate: '',
            auctionPreviewStartTime: '',
            auctionPreviewEndDate: '',
            auctionPreviewEndTime: '',
        },
        validationSchema: Yup.object({
            auctionId: Yup.string().required('Auction ID is required'),
            auctionName: Yup.string().required('Auction Name is required'),
            auctionType: Yup.string().oneOf(['Current', 'Past']).required('Auction Type is required'), // Added validation for the dropdown options
            auctionImage: Yup.mixed().required('Auction Image is required'),
            description: Yup.string().max(500).required('Description is required'),
            startDate: Yup.date().required('Start Date is required'),
            startTime: Yup.string().required('Start Time is required'),
            endDate: Yup.date().required('End Date is required'),
            endTime: Yup.string().required('End Time is required'),
            checkoutDate: Yup.date().required('Checkout Date is required'),
            checkoutTime: Yup.string().required('Checkout Time is required'),
            auctionPreviewStartDate: Yup.date().required('Preview Start Date is required'),
            auctionPreviewStartTime: Yup.string().required('Preview Start Time is required'),
            auctionPreviewEndDate: Yup.date().required('Preview End Date is required'),
            auctionPreviewEndTime: Yup.string().required('Preview End Time is required'),
        }),
        onSubmit: (values) => {
            setAuctionData(values);
            setIsContinue(true)
        },
    });

    useEffect(() => {
        if (formik.errors && Object.keys(formik.errors).length > 0) {
            const firstErrorField = Object.keys(formik.errors)[0];
            const errorElement: any = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                errorElement.focus();
            }
        }
    }, [submissionAttempt]);

    const handleCancelConfirmation = () => {
        formik.resetForm();
        navigate('/auction')
    }

    return (
        <Box>
            <Typography className={classes.title}>Create New Auction</Typography>
            <form onSubmit={formik.handleSubmit}>
                {/* First Portion */}
                <Box sx={{ padding: 3, marginBottom: 3, border: '1px solid #E2E8F0', borderRadius: "20px" }}>
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Auction ID
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="auctionId"
                                placeholder={'# 01'}
                                value={formik.values.auctionId}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionId && Boolean(formik.errors.auctionId)}
                                helperText={formik.touched.auctionId && formik.errors.auctionId}
                            />
                        </Box>
                        <Box flex={1} mx={2}>
                            <Typography className={classes.label}>
                                Auction Name
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="auctionName"
                                placeholder={'Enter Name'}
                                value={formik.values.auctionName}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionName && Boolean(formik.errors.auctionName)}
                                helperText={formik.touched.auctionName && formik.errors.auctionName}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Auction Type
                            </Typography>
                            <CustomTextField
                                select
                                fullWidth
                                name="auctionType"
                                value={formik.values.auctionType}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionType && Boolean(formik.errors.auctionType)}
                                helperText={formik.touched.auctionType && formik.errors.auctionType}
                                sx={{
                                    '& .MuiSelect-icon': {
                                        color: '#A0AEC0', // Set the color of the arrow icon
                                    },
                                }}
                            >
                                <MenuItem value="Current">Current</MenuItem>
                                <MenuItem value="Past">Past</MenuItem>
                            </CustomTextField>
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Typography className={classes.label}>
                            Upload Auction Image
                        </Typography>
                        <ImageUploader
                            file={file}
                            setFile={(uploadedFile: any) => {
                                setFile(uploadedFile); // Update local state
                                formik.setFieldValue('auctionImage', uploadedFile); // Update Formik state
                            }} />
                        {formik.touched.auctionImage && formik.errors.auctionImage && (
                            <Typography color="error" variant="body2">
                                {formik.errors.auctionImage}
                            </Typography>
                        )}
                    </Box>
                    <Box mt={3}>
                        <Typography className={classes.label}>
                            Description
                        </Typography>
                        <CustomMultiLineTextField
                            fullWidth
                            multiline
                            maxRows={3}
                            name="description"
                            placeholder="Tell me about the product..."
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}

                            sx={{
                                borderRadius: "15px !important"
                            }}
                        />
                    </Box>
                    {/* <Box mt={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="liveStreaming"
                                    checked={formik.values.liveStreaming}
                                    onChange={formik.handleChange}
                                />
                            }
                            label={<Typography className={classes.checkBoxLabel}>Live Streaming</Typography>}
                        />
                    </Box> */}
                </Box>

                {/* Second Portion */}
                <Box sx={{ padding: 3, marginBottom: 3, border: '1px solid #E2E8F0', borderRadius: "20px" }}>

                    {/* Auction Date Time */}
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Date
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="startDate"
                                type="date"
                                placeholder='Select Date'
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                                inputProps={{ min: today }} // Disable past dates
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                End Date
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="endDate"
                                type="date"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                helperText={formik.touched.endDate && formik.errors.endDate}
                                inputProps={{ min: today }} // Disable past dates
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Checkout Date
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="checkoutDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.checkoutDate}
                                onChange={formik.handleChange}
                                error={formik.touched.checkoutDate && Boolean(formik.errors.checkoutDate)}
                                helperText={formik.touched.checkoutDate && formik.errors.checkoutDate}
                                inputProps={{ min: today }} // Disable past dates
                            />
                        </Box>
                    </Box>

                    {/* Checkout Date Time */}
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Time
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="startTime"
                                type="time"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                End Time
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="endTime"
                                type="time"
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                helperText={formik.touched.endTime && formik.errors.endTime}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Checkout Time
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="checkoutTime"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.checkoutTime}
                                onChange={formik.handleChange}
                                error={formik.touched.checkoutTime && Boolean(formik.errors.checkoutTime)}
                                helperText={formik.touched.checkoutTime && formik.errors.checkoutTime}
                            />
                        </Box>
                    </Box>

                    {/* Preview Time */}
                    <Typography className={classes.preview}>Preview Time</Typography>
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Date
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="auctionPreviewStartDate"
                                type="date"
                                placeholder='Select Date'
                                value={formik.values.auctionPreviewStartDate}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionPreviewStartDate && Boolean(formik.errors.auctionPreviewStartDate)}
                                helperText={formik.touched.auctionPreviewStartDate && formik.errors.auctionPreviewStartDate}
                                inputProps={{ min: today }} // Disable past dates
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                End Date
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="auctionPreviewEndDate"
                                type="date"
                                value={formik.values.auctionPreviewEndDate}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionPreviewEndDate && Boolean(formik.errors.auctionPreviewEndDate)}
                                helperText={formik.touched.auctionPreviewEndDate && formik.errors.auctionPreviewEndDate}
                                inputProps={{ min: today }} // Disable past dates
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Time
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="auctionPreviewStartTime"
                                type="time"
                                value={formik.values.auctionPreviewStartTime}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionPreviewStartTime && Boolean(formik.errors.auctionPreviewStartTime)}
                                helperText={formik.touched.auctionPreviewStartTime && formik.errors.auctionPreviewStartTime}
                            />
                        </Box>
                    </Box>
                    <Box width={'32.85%'}>
                        <Box flex={0.3}>
                            <Typography className={classes.label}>
                                End Time
                            </Typography>
                            <CustomTextField
                                fullWidth
                                name="auctionPreviewEndTime"
                                type="time"
                                value={formik.values.auctionPreviewEndTime}
                                onChange={formik.handleChange}
                                error={formik.touched.auctionPreviewEndTime && Boolean(formik.errors.auctionPreviewEndTime)}
                                helperText={formik.touched.auctionPreviewEndTime && formik.errors.auctionPreviewEndTime}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.actionButtons}>
                    <Button
                        className={classes.cancelButton}
                        variant="outlined"
                        onClick={() => setIsCancelOpen(true)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={classes.continueButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => setSubmissionAttempt(!submissionAttempt)}
                    >
                        Continue
                    </Button>
                </Box>
            </form >

            {/* Cancel Cofirmation on Cancel Button*/}
            <CustomDialogue
                type={"create"}
                title={"Cancel Auction Creation?"}
                message={"Are you sure you want to cancel creating the current auction?"}
                openDialogue={isCancelOpen}
                handleCloseModal={() => setIsCancelOpen(false)}
                handleConfirmModal={handleCancelConfirmation}
                isDeleting={false}
            />
        </Box >
    );
};

export default CreateAuction;
