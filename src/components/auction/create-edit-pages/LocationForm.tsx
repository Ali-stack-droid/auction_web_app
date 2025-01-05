import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../custom-components/CustomTextField';
import { useCreateAuctionStyles } from './CreateAuctionStyles';
import { CustomMultiLineTextField } from '../../custom-components/CustomMultiLineTextField';
import theme from '../../../theme';
import CustomDialogue from '../../custom-components/CustomDialogue';
import { useNavigate } from 'react-router-dom';

const LocationForm = ({ setLocationData, isSubmitted, setIsSubmitted, isSubmittedByLot, setIsSubmittedByLot, setNavigation }: any) => {
    const classes = useCreateAuctionStyles();

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const [formData, setFormData]: any = useState({})
    const [submissionAttempt, setSubmissionAttempt]: any = useState({})

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            address: '',
            city: 'z',
            zipCode: '',
            state: 'z',
            country: 'z',
            buyerPremium: 'z',
            paymentTerms: '',
            shippingMethod: 'Shipping',
            termsAndConditions: '',
        },
        validationSchema: Yup.object({
            address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
            zipCode: Yup.string().required('Zip Code is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
            buyerPremium: Yup.string().required('Buyer Premium is required'),
            paymentTerms: Yup.string().max(500).required('Payment Terms are required'),
            termsAndConditions: Yup.string().max(500).required('Terms and Conditions are required'),
        }),
        onSubmit: (values) => {
            if (!isSubmitted && !isSubmittedByLot) {
                setFormData(values)
                setOpenConfirmModal(true);
            }
        }
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

    const handleConfirmSubmission = () => {
        setLocationData(formData)
        setOpenConfirmModal(false);
        setNavigation('auction')
        setIsSubmitted(true)
    }

    const handleAddLot = () => {
        formik.validateForm().then((errors) => {
            const hasErrors = Object.keys(errors).length > 0;
            if (hasErrors) {
                setOpenSaveModal(true);
            } else {
                setLocationData(formik.values);
                setNavigation('lots')
                setIsSubmittedByLot(true);
            }
        });
    }

    const handleCancelConfirmation = () => {
        formik.resetForm();
        navigate('/auction')
    }

    return (
        <Box>
            <Typography className={classes.title}>Create New Auction</Typography>
            <Typography className={classes.location}>Location</Typography>

            <form onSubmit={formik.handleSubmit}>
                {/* First Row */}
                <Box sx={{ padding: 3, marginBottom: 3, border: '1px solid #E2E8F0', borderRadius: "20px" }}>
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>Address</Typography>
                            <CustomTextField
                                fullWidth
                                name="address"
                                placeholder="Enter Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>City</Typography>
                            <CustomTextField
                                select
                                fullWidth
                                name="city"
                                placeholder='select city'
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                sx={{
                                    '& .MuiSelect-icon': {
                                        color: '#A0AEC0', // Set the color of the arrow icon
                                    },
                                }}
                            >
                                <MenuItem value="z" sx={{ display: 'none' }}>
                                    <Typography sx={{ opacity: 0.5 }}>Select City</Typography>
                                </MenuItem>
                                <MenuItem value="City1">City1</MenuItem>
                                <MenuItem value="City2">City2</MenuItem>
                            </CustomTextField>
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>Zip Code</Typography>
                            <CustomTextField
                                fullWidth
                                name="zipCode"
                                placeholder="Enter Zip Code"
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
                                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                helperText={formik.touched.zipCode && formik.errors.zipCode}
                            />
                        </Box>
                    </Box>

                    {/* Second Row */}
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'} maxWidth={"66.1%"}>
                        <Box flex={1}>
                            <Typography className={classes.label}>State</Typography>
                            <CustomTextField
                                select
                                fullWidth
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                                sx={{
                                    '& .MuiSelect-icon': {
                                        color: '#A0AEC0', // Set the color of the arrow icon
                                    },
                                }}
                            >
                                <MenuItem value="z" sx={{ display: 'none' }}>
                                    <Typography sx={{ opacity: 0.5 }}>Select State</Typography>
                                </MenuItem>
                                <MenuItem value="State1">State1</MenuItem>
                                <MenuItem value="State2">State2</MenuItem>
                            </CustomTextField>
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>Country</Typography>
                            <CustomTextField
                                select
                                fullWidth
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                                sx={{
                                    '& .MuiSelect-icon': {
                                        color: '#A0AEC0', // Set the color of the arrow icon
                                    },
                                }}
                            >
                                <MenuItem value="z" sx={{ display: 'none' }}>
                                    <Typography sx={{ opacity: 0.5 }}>Select Country</Typography>
                                </MenuItem>
                                <MenuItem value="Country1">Country1</MenuItem>
                                <MenuItem value="Country2">Country2</MenuItem>
                            </CustomTextField>
                        </Box>
                    </Box>

                    {/* Third Row */}
                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'} maxWidth={"32.4%"}>
                        <Box flex={1}>
                            <Typography className={classes.label}>Buyer Premium</Typography>
                            <CustomTextField
                                select
                                fullWidth
                                name="buyerPremium"
                                value={formik.values.buyerPremium}
                                onChange={formik.handleChange}
                                error={formik.touched.buyerPremium && Boolean(formik.errors.buyerPremium)}
                                helperText={formik.touched.buyerPremium && formik.errors.buyerPremium}
                                sx={{
                                    '& .MuiSelect-icon': {
                                        color: '#A0AEC0', // Set the color of the arrow icon
                                    },
                                }}
                            >
                                <MenuItem value="z" sx={{ display: 'none' }}>
                                    <Typography sx={{ opacity: 0.5 }}>Select Percentage</Typography>
                                </MenuItem>
                                {[0, 5, 10, 15, 20, 25].map((value) => (
                                    <MenuItem key={value} value={value}>{value}%</MenuItem>
                                ))}
                            </CustomTextField>
                        </Box>
                    </Box>

                    <Box flex={1}>
                        <Typography className={classes.info}>Payment Information</Typography>
                        <Typography className={classes.infoText}>Currency: USD</Typography>
                    </Box>

                    {/* Payment Terms */}
                    <Box>
                        <Typography className={classes.label}>Payment Terms</Typography>
                        <CustomMultiLineTextField
                            fullWidth
                            multiline
                            maxRows={5}
                            name="paymentTerms"
                            placeholder="Enter Payment Terms..."
                            value={formik.values.paymentTerms}
                            onChange={formik.handleChange}
                            error={formik.touched.paymentTerms && Boolean(formik.errors.paymentTerms)}
                            helperText={formik.touched.paymentTerms && formik.errors.paymentTerms}
                        />
                        <Typography className={classes.wordCount} align="right">
                            {formik.values.paymentTerms.length}/500 Words
                        </Typography>
                    </Box>

                    {/* Shipping or Pickup */}
                    <Box mb={2}>
                        <RadioGroup
                            row
                            name="shippingMethod"
                            value={formik.values.shippingMethod}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel
                                value="Shipping"
                                control={<Radio />}
                                label="Shipping"
                                sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px', mr: 2 } }} // Adjust label font size

                            />
                            <FormControlLabel
                                value="Pickup"
                                control={<Radio />}
                                label="Pickup"
                                sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }} // Adjust label font size
                            />
                        </RadioGroup>
                    </Box>

                    {/* Terms and Conditions */}
                    <Box mb={2}>
                        <Typography className={classes.label}>Terms and Conditions</Typography>
                        <CustomMultiLineTextField
                            fullWidth
                            multiline
                            maxRows={5}
                            name="termsAndConditions"
                            placeholder="Enter Terms and Conditions..."
                            value={formik.values.termsAndConditions}
                            onChange={formik.handleChange}
                            error={formik.touched.termsAndConditions && Boolean(formik.errors.termsAndConditions)}
                            helperText={formik.touched.termsAndConditions && formik.errors.termsAndConditions}
                        />
                        <Typography className={classes.wordCount} align="right">
                            {formik.values.termsAndConditions.length}/500 Words
                        </Typography>
                    </Box>

                    <Box className={classes.actionButtons}>
                        <Button
                            className={classes.cancelButton}
                            variant="outlined"
                            onClick={() => handleAddLot()}
                        >
                            {isSubmittedByLot ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main }} /> : 'Add a Lot'}

                        </Button>
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
                            {isSubmitted ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main3 }} /> : 'Submit'}
                        </Button>
                    </Box>
                </Box>
            </form>

            {/* Confirmation Modal On Save Button*/}
            <CustomDialogue
                type={"create"}
                title={"Confirm Submission!"}
                message={"Are you sure you want to create current auction without adding lots?"}
                openDialogue={openConfirmModal}
                handleCloseModal={() => setOpenConfirmModal(false)}
                handleConfirmModal={() => handleConfirmSubmission()}
                isDeleting={false}

            />


            {/* Save Changes Modal On Add a Lot Button*/}
            <CustomDialogue
                type={"addALot"}
                title={"Save Changes!"}
                message={"Save your changes before adding a lot."}
                openDialogue={openSaveModal}
                handleCloseModal={() => setOpenSaveModal(false)}
                handleConfirmModal={() => setOpenSaveModal(false)}
                isDeleting={false}

            />

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
        </Box>
    );
};

export default LocationForm;