import { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Fade, Typography, useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Carousel = () => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true); // Manage fade in/out state
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // List of SVG file names and their corresponding texts
    const items = [
        { svg: 'loginImage1.svg', text: 'Login Image 1' },
        { svg: 'loginImage2.svg', text: 'Login Image 2' },
        { svg: 'loginImage1.svg', text: 'Login Image 3' },
    ];

    // Automatically update the current index every 3 seconds
    useEffect(() => {
        // Clear any existing interval to avoid duplication
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Start a new interval
        intervalRef.current = setInterval(() => {
            setFadeIn(false); // Trigger fade out before changing
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true); // Fade in new image
            }, 500); // Wait for fade out to complete before changing image
        }, 5000); // 3 seconds

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Handle manual navigation through dots
    const handleDotClick = (index: number) => {
        // Clear the interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Set the index immediately and reset the interval
        setFadeIn(false); // Fade out before updating

        setTimeout(() => {
            setCurrentIndex(index);
            setFadeIn(true); // Fade in the new image
        }, 500);

        // Restart the interval
        intervalRef.current = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true);
            }, 350); // Wait for fade out to complete before changing image
        }, 5000);
    };

    return (
        <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                color: '#fff',
                padding: 4,
            }}
        >
            {/* Slide and Fade Animation for Text and Image */}
            <Fade in={fadeIn} timeout={1000}>
                <Box textAlign="center" width="100%">
                    <Typography
                        color="black"
                        variant="h5"
                        mb={2}
                    >
                        {items[currentIndex].text}
                    </Typography>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/svgs/${items[currentIndex].svg}`}
                        alt={`SVG ${currentIndex}`}
                    // height="auto" // Maintain aspect ratio
                    />
                </Box>
            </Fade>

            {/* Navigation Dots with Animation */}
            <Box display="flex" justifyContent="center" mt={2}>
                {items.map((_, index) => (
                    <IconButton
                        key={index}
                        onClick={() => handleDotClick(index)}
                        sx={{
                            size: 'small',
                            width: 18,
                            height: 18,
                            margin: '0 4px',
                            backgroundColor: currentIndex === index ? primaryColor : 'transparent',
                            border: `2px solid ${primaryColor}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& svg': {
                                fill: currentIndex === index ? primaryColor : 'white',
                                transition: 'fill 0.5s ease-in-out, background-color 0.7s ease-in-out',
                            },
                            transition: 'background-color 0.5s ease-in-out', // Sync button fill color
                        }}
                    >
                        <FiberManualRecordIcon />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default Carousel;
