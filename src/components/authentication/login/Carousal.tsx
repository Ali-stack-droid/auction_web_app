import { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Fade, Typography, useTheme, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Carousel = () => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is mobile

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const items = [
        { svg: 'imglogin1.svg', text: 'Lorem ipsum dolor sit amet' },
        { svg: 'imglogin2.svg', text: 'Lorem ipsum dolor sit adipisicing' },
        { svg: 'imglogin1.svg', text: 'Lorem ipsum dolor sit' },
    ];

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true);
            }, 500);
        }, 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleDotClick = (index: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setFadeIn(false);

        setTimeout(() => {
            setCurrentIndex(index);
            setFadeIn(true);
        }, 500);

        intervalRef.current = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true);
            }, 500);
        }, 5000);
    };

    return (
        <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            padding={8}
            height={isMobile ? "300px" : "70%"}
        >
            <Fade in={fadeIn} timeout={1000}>
                <Typography
                    variant="h4"
                    mb={2}
                >
                    {items[currentIndex].text}
                </Typography>
            </Fade>
            <Fade in={fadeIn} timeout={1000}>

                <Box textAlign="center" width="100%" >

                    <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/assets/svgs/${items[currentIndex].svg}`}
                        alt={`SVG ${currentIndex}`}
                        sx={{
                            width: "80%", // Responsive width
                            height: 'auto', // Maintain aspect ratio
                            transition: 'width 0.2s ease-in-out', // Smooth resize
                        }}
                    />
                </Box>
            </Fade>

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
                            transition: 'background-color 0.5s ease-in-out',
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
