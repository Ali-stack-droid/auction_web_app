import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // List of SVGs
    const svgs = [
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="blue" strokeWidth="3" fill="lightblue" />
        </svg>,
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" x="10" y="10" stroke="green" strokeWidth="3" fill="lightgreen" />
        </svg>,
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,10 90,80 10,80" stroke="purple" strokeWidth="3" fill="lightpink" />
        </svg>,
    ];

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
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
                minHeight: '100vh',
                padding: 4,
            }}
        >
            {/* Display the current SVG */}
            <Box>{svgs[currentIndex]}</Box>

            {/* Navigation Dots */}
            <Box display="flex" justifyContent="center" mt={2}>
                {svgs.map((_, index) => (
                    <IconButton
                        key={index}
                        onClick={() => handleDotClick(index)}
                        sx={{
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
