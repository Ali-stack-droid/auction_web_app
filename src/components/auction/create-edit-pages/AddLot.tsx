import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, MenuItem, FormControlLabel, Checkbox, IconButton, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../custom-components/CustomTextField';
import { CustomMultiLineTextField } from '../../custom-components/CustomMultiLineTextField';
import ImageUploader from '../../custom-components/ImageUploader';
import { useCreateAuctionStyles } from './CreateAuctionStyles';
import { createLot, editLot, getLotDetailsById } from '../../Services/Methods';
import { SuccessMessage, ErrorMessage } from '../../../utils/ToastMessages';
import { formatDate, formatDateInput, formatTime, formatTimeInput } from '../../../utils/Format';
import BidsRange from '../auction-components/BidsRange';
import CustomDialogue from '../../custom-components/CustomDialogue';
import LotsTable from '../auction-components/LotsTable';
import { useLocation, useNavigate } from 'react-router-dom';

// redux imports
import { getQueryParam } from '../../../helper/GetQueryParam';

// Define the type of categories object
type CategoryType = {
    [key: string]: string[]; // Index signature for dynamic keys with array of strings as values
};

const AddLot = () => {

    const classes = useCreateAuctionStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);
    const isEdit = location.pathname === '/auction/lots/edit';

    const [file, setFile] = useState(null)
    const [lots, setLots]: any = useState([])
    const [confirmModal, setConfirmModal] = useState(false);
    const [submissionAttempt, setSubmissionAttempt] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const categories: CategoryType = {
        Vehicles: ["Automobiles/Cars", "Motorcycles", "SUVs", "Trucks", "Buses", "RVs & Campers", "Boats", "Trailers", "Specialized Vehicles"],
        HeavyEquipment: ["Construction Equipment", "Agricultural Equipment", "Industrial Equipment", "Mining Equipment", "Public Safety Equipment"],
        RealEstate: ["Residential Properties", "Commercial Properties", "Vacant Land", "Buildings and Structures"],
        ConsumerGoods: ["Electronics", "Furniture", "Home Appliances", "Clothing & Accessories", "Sporting Goods", "Toys & Games"],
        GeneralSurplus: ["Office Equipment", "Medical Equipment", "Laboratory Equipment", "Aviation Equipment"],
        Miscellaneous: ["Collectibles", "Antiques", "Art", "Jewelry", "Musical Instruments", "Books"]
    };

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [subCategories, setSubCategories] = useState<string[]>([]);


    const formik = useFormik({
        initialValues: {
            orderNumber: '',
            lotNumber: '',
            category: 'placeholder',
            subCategory: 'placeholder',
            lead: '',
            description: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            internalNotes: '',
            auctionImage: '',
            bidsRange: [{ startAmount: '', endAmount: '', bidRangeAmount: '' }] // Initial bidsRange
        },
        validationSchema: Yup.object({
            orderNumber: Yup.string().required('Order Number is required'),
            lotNumber: Yup.string().required('Lot Number is required'),
            category: Yup.string().required('Category is required'),
            subCategory: Yup.string().required('Sub-Category is required'),
            lead: Yup.string().required('Lead is required'),
            description: Yup.string().max(500).required('Description is required'),
            startDate: Yup.date().required('Start Date is required'),
            startTime: Yup.string().required('Start Time is required'),
            endDate: Yup.date().required('End Date is required'),
            endTime: Yup.string().required('End Time is required'),
            internalNotes: Yup.string(),
            auctionImage: Yup.mixed().required('Auction Image is required'),
            bidsRange: Yup.array()
                .of(
                    Yup.object().shape({
                        startAmount: Yup.number()
                            .required('Start Amount is required')
                            .typeError('Start Amount must be a number'),
                        endAmount: Yup.number()
                            .required('End Amount is required')
                            .typeError('End Amount must be a number')
                            .moreThan(
                                Yup.ref('startAmount'),
                                'End Amount must be greater than Start Amount'
                            ),
                        bidRangeAmount: Yup.number()
                            .required('Bid Range Amount is required')
                            .typeError('Bid Range Amount must be a number'),
                    })
                )
                .min(1, 'At least one bid range is required')
                .required('Bids Range is required'),
        }),
        onSubmit: (values) => {
            if (!isEdit) {
                const newLot = {
                    Id: lots.length + 1,
                    OrderNo: values.orderNumber,
                    LotNo: values.lotNumber,
                    Image: "example.jpg",
                    Category: values.category,
                    SubCategory: values.subCategory,
                    ShortDescription: values.lead,
                    LongDescription: values.description,
                    BidStartAmount: values.bidsRange[0]?.startAmount,
                    StartDate: formatDate(values.startDate),
                    EndDate: formatDate(values.endDate),
                    StartTime: formatTime(values.startTime),
                    EndTime: formatTime(values.endTime),
                    BuyerPremium: 15,
                    Currency: 'USD',
                    CreatedAt: formatDate(values.startDate),
                    UpdatedAt: formatDate(values.startDate),
                    AuctionId: getQueryParam('aucId'),
                    BidsRange: values.bidsRange.map((bid: any) => ({
                        StartAmount: bid.startAmount,
                        EndAmount: bid.endAmount,
                        BidRange: bid.bidRangeAmount,
                        LotId: lots.length + 1,
                    })),
                };
                const formattedLots = [...lots, newLot];
                setLots(formattedLots)
                handleFormSubmission(newLot);
            } else {
                const edittedLot = {
                    Id: getQueryParam('lotId'),
                    OrderNo: values.orderNumber,
                    LotNo: values.lotNumber,
                    Image: "example.jpg",
                    Category: values.category,
                    SubCategory: values.subCategory,
                    ShortDescription: values.lead,
                    LongDescription: values.description,
                    BidStartAmount: values.bidsRange[0]?.startAmount,
                    StartDate: formatDate(values.startDate),
                    EndDate: formatDate(values.endDate),
                    StartTime: formatTime(values.startTime),
                    EndTime: formatTime(values.endTime),
                    BuyerPremium: 15,
                    Currency: 'USD',
                    CreatedAt: formatDate(values.startDate),
                    UpdatedAt: formatDate(values.startDate),
                    AuctionId: getQueryParam('aucId'),
                    BidsRange: values.bidsRange.map((bid: any) => ({
                        StartAmount: bid.startAmount,
                        EndAmount: bid.endAmount,
                        BidRange: bid.bidRangeAmount,
                        LotId: getQueryParam('lotId'),
                    })),
                };
                handleFormSubmission(edittedLot);
            }
        },
    });

    useEffect(() => {
        const lotId = getQueryParam('lotId');
        if (lotId) {
            setIsFetchingData(true);
            const fetchAuctionDetails = async () => {
                try {
                    const response = await getLotDetailsById(lotId);
                    const images = response.data.Images;
                    const bidsRange = response.data.BidsRange?.map((bid: any) => ({
                        startAmount: bid.StartAmount,
                        endAmount: bid.EndAmount,
                        bidRangeAmount: bid.BidRange
                    }))
                    const lot = response.data.Lot;

                    if (lot) {
                        const formattedLot: any = {
                            orderNumber: lot.OrderNo,
                            lotNumber: lot.LotNo,
                            category: lot.Category,
                            subCategory: lot.SubCategory,
                            lead: lot.ShortDescription,
                            description: lot.LongDescription,
                            startDate: formatDateInput(lot.StartDate),
                            startTime: formatTimeInput(lot.StartTime),
                            endDate: formatDateInput(lot.EndDate),
                            endTime: formatTimeInput(lot.EndTime),
                            internalNotes: lot.InternalNotes || '',
                            auctionImage: lot.Image,
                            bidsRange: bidsRange
                        };
                        setSelectedCategory(formattedLot.category);
                        setSubCategories(categories[formattedLot.category]); // Update subcategories
                        // Populate formik fields
                        formik.setValues(formattedLot);

                    } else {
                        ErrorMessage('Lot data not found');
                    }
                } catch (error) {
                } finally {
                    setIsFetchingData(false);
                }
            };

            fetchAuctionDetails();
        }
    }, []);

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

    const handleFormSubmission = async (payload: any) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        if (file) {
            formData.append("file", file);
            setFile(null);
        }

        if (isEdit) {
            editLot(payload)
                .then((response) => {
                    console.log(response)
                    SuccessMessage('Lot updated successfully!');
                    formik.resetForm();
                })
                .catch((error) => {
                    ErrorMessage('Error updating lot!');
                });
        } else {

            createLot(formData)
                .then((response) => {
                    SuccessMessage('Lot created successfully!');
                    formik.resetForm();
                })
                .catch((error) => {
                    ErrorMessage('Error creating lot!');
                });
        }
    };

    const handleConfirmAddLot = () => {
        formik.resetForm();
        setConfirmModal(false);
        setFile(null)
    }

    const handleCancelConfirmation = () => {
        formik.resetForm();
        navigate('/auction');
    }

    const handleSaveLot = () => {
        setSubmissionAttempt(!submissionAttempt)
        setSaveModal(false)
    }

    const handleCategoryChange = (event: any) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSubCategories(categories[category] || []); // Update subcategories
        formik.setFieldValue("category", category);
        formik.setFieldValue("subCategory", "placeholder"); // Reset subcategory on category change
    };

    return (
        <Box p={2}>
            <Typography className={classes.title}>{getQueryParam('lotId') ? "Edit Lot" : "Create New Lot"}</Typography>
            <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: 3 }}>
                <Box >
                    <Typography className={classes.location}>Lots:</Typography>
                </Box>
                {!getQueryParam('lotId') &&
                    <Button variant={"contained"} onClick={() => setConfirmModal(true)} sx={{ textTransform: 'none' }}>
                        Add Another Lot
                    </Button>
                }
            </Box>

            {lots?.length > 0 &&
                <Box pb={2}>
                    <LotsTable lots={lots} setLots={setLots} />
                </Box>
            }

            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ padding: 3, marginBottom: 3, border: '1px solid #E2E8F0', borderRadius: "20px" }}>

                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Order Number
                            </Typography>
                            <CustomTextField
                                name="orderNumber"
                                placeholder="Order Number"
                                value={formik.values.orderNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.orderNumber && Boolean(formik.errors.orderNumber)}
                                helperText={formik.touched.orderNumber && formik.errors.orderNumber}
                            />
                        </Box>
                        <Box flex={1} mx={2}>
                            <Typography className={classes.label}>
                                Lot Number
                            </Typography>
                            <CustomTextField
                                name="lotNumber"
                                placeholder="Lot Number"
                                value={formik.values.lotNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.lotNumber && Boolean(formik.errors.lotNumber)}
                                helperText={formik.touched.lotNumber && formik.errors.lotNumber}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Category
                            </Typography>
                            <CustomTextField
                                select
                                name="category"
                                value={formik.values.category}
                                onChange={handleCategoryChange}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                            >
                                <MenuItem value="placeholder" sx={{ display: 'none' }}>
                                    <Typography sx={{ opacity: 0.5 }}>Select Category</Typography>
                                </MenuItem>
                                {Object.keys(categories).map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Box>
                    </Box>

                    <Box display="flex" gap={2} mb={3} justifyContent={'space-between'}>
                        <Box flex={0.479}>
                            <Typography className={classes.label}>
                                Sub-Category
                            </Typography>
                            <CustomTextField
                                select
                                name="subCategory"
                                value={formik.values.subCategory}
                                onChange={formik.handleChange}
                                error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
                                helperText={formik.touched.subCategory && formik.errors.subCategory}
                                disabled={!selectedCategory} // Disable if no category is selected
                            >
                                <MenuItem value="placeholder" sx={{ display: 'none' }}>
                                    <Typography sx={{ opacity: 0.5 }}>Select Subcategory</Typography>
                                </MenuItem>
                                {subCategories.map((subCategory, index) => (
                                    <MenuItem key={index} value={subCategory}>
                                        {subCategory}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                        </Box>
                        <Box flex={1} ml={2}>
                            <Typography className={classes.label}>
                                Lead
                            </Typography>
                            <CustomTextField
                                name="lead"
                                placeholder="Lead"
                                value={formik.values.lead}
                                onChange={formik.handleChange}
                                error={formik.touched.lead && Boolean(formik.errors.lead)}
                                helperText={formik.touched.lead && formik.errors.lead}
                            />
                        </Box>
                    </Box>

                    <Typography className={classes.info} my={1}>Bid Increment</Typography>

                    <BidsRange formik={formik} />

                    <Box flex={1} mb={2}>
                        <Typography className={classes.label}>
                            Description
                        </Typography>
                        <CustomMultiLineTextField
                            name="description"
                            placeholder="Description"
                            maxRows={5}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Box>

                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Date
                            </Typography>
                            <CustomTextField
                                name="startDate"
                                type="date"
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                                inputProps={{ min: today }} // Disable past dates
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Time
                            </Typography>
                            <CustomTextField
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
                                End Date
                            </Typography>
                            <CustomTextField
                                name="endDate"
                                type="date"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                helperText={formik.touched.endDate && formik.errors.endDate}
                                inputProps={{ min: today }} // Disable past dates

                            />
                        </Box>
                    </Box>

                    <Box width={'32.3%'} mb={2}>
                        <Typography className={classes.label}>
                            End Time
                        </Typography>
                        <CustomTextField
                            name="endTime"
                            type="time"
                            value={formik.values.endTime}
                            onChange={formik.handleChange}
                            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                            helperText={formik.touched.endTime && formik.errors.endTime}
                        />
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
                            Internal Notes
                        </Typography>
                        <CustomMultiLineTextField
                            name="internalNotes"
                            placeholder="Internal Notes"
                            value={formik.values.internalNotes}
                            onChange={formik.handleChange}
                        />
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
                            onClick={() => {
                                if (Object.keys(formik.errors).length === 0) {
                                    if (!isEdit) setSaveModal(true);
                                }
                            }}
                        >
                            {isEdit ? "Update Lot" : "Confirm"}
                        </Button>
                    </Box>
                </Box>
            </form >
            {/* Confirmation Modal */}
            < CustomDialogue
                type={"create"}
                title={"Confirm Add New Lot"}
                message={"Are you sure to create new lot without saving current lot?"}
                openDialogue={confirmModal}
                handleCloseModal={() => setConfirmModal(false)}
                handleConfirmModal={handleConfirmAddLot}
                isDeleting={false}

            />

            {/* Cancel Cofirmation on Cancel Button*/}
            < CustomDialogue
                type={"create"}
                title={"Cancel Auction Creation?"}
                message={`Are you sure you want to cancel ${isEdit ? 'editing' : 'creating'} the current lot?`}
                openDialogue={isCancelOpen}
                handleCloseModal={() => setIsCancelOpen(false)}
                handleConfirmModal={handleCancelConfirmation}
                isDeleting={false}

            />

            <CustomDialogue
                type={"continue"}
                title={"Add another Lot?"}
                message={"Do you wish to add another lot?"}
                openDialogue={saveModal}
                handleCloseModal={() => navigate('/auction')}
                handleConfirmModal={handleSaveLot}
                isDeleting={false}

            />

        </Box >
    );
};

export default AddLot;
