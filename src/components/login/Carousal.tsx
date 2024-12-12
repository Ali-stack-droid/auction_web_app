import { useState, useEffect } from 'react';
import { Box, IconButton, Fade, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    // List of SVG file names and their corresponding texts
    const items = [
        { svg: 'loginImage1.svg', text: 'Login Image 1' },
        { svg: 'loginImage2.svg', text: 'Rectangle Shape' },
        { svg: 'loginImage3.svg', text: 'Triangle Shape' },
    ];

    // Automatically update the current index every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true);
            }, 500); // Wait for fade out before updating index
        }, 3000); // 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [items.length]);

    // Handle manual navigation through dots
    const handleDotClick = (index: number) => {
        setFadeIn(false);
        setTimeout(() => {
            setCurrentIndex(index);
            setFadeIn(true);
        }, 500); // Ensure smooth fade out before updating index
    };

    return (
        <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                bgcolor: '#1976d2',
                color: '#fff',
                padding: 4,
            }}
        >
            {/* Fade Animation */}
            <Fade in={fadeIn} timeout={500}>
                <Box textAlign="center">
                    <Typography
                        variant="h6"
                        sx={{ marginBottom: 2, transition: 'opacity 0.8s ease-in-out' }}
                    >
                        {items[currentIndex].text}
                    </Typography>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/svgs/${items[currentIndex].svg}`}
                        alt={`SVG ${currentIndex}`}
                        width="100"
                        height="100"
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
                            transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.3s ease-in-out',
                            color: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
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
