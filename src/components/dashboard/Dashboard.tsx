import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import useDashboardStyles from "./DashboardStyles";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import { ResponsiveContainer, BarChart, Bar } from "recharts";
import theme from "../../theme";

const Dashboard = () => {
    const classes = useDashboardStyles();

    const data = [
        {
            title: "Total Amount Received",
            value: "$ 20,000+",
            date: "9 February 2024",
            icon: <PriceChangeRoundedIcon className={classes.cardIcon} />,
        },
        {
            title: "Total Amount Pending",
            value: "$ 8,000+",
            date: "12 January 2024",
            icon: <PendingActionsRoundedIcon className={classes.cardIcon} />,
        },
        {
            title: "Total Products",
            value: "20,000+",
            date: "2 December 2024",
            icon: <CategoryRoundedIcon className={classes.cardIcon} />,
        },
        {
            title: "Total Products Sold",
            value: "16,000+",
            date: "9 February 2024",
            icon: <MilitaryTechRoundedIcon className={classes.cardIcon} />,
        },
    ];

    const chartData = [
        { name: 'January', sales: 2000, products: 400 },
        { name: 'February', sales: 4000, products: 450 },
        { name: 'March', sales: 3000, products: 700 },
        { name: 'April', sales: 2000, products: 800 },
        { name: 'May', sales: 1000, products: 900 },
        { name: 'June', sales: 3000, products: 1200 },
        { name: 'July', sales: 5000, products: 1500 },
        { name: 'August', sales: 5500, products: 1800 },
    ]

    return (
        <Box sx={{ padding: 2 }}>
            <Typography className={classes.title}>Statistics of Dashboard</Typography>
            <Box className={classes.dashboardContainer}>
                {data.map((item, index) => (
                    <Card key={index} className={classes.card} elevation={0}>
                        <CardContent>
                            <Box>
                                <Box className={classes.cardHeader}>
                                    <Typography className={classes.cardTitle}>
                                        {item.title}
                                    </Typography>
                                    {item.icon}
                                </Box>
                                <Typography className={classes.cardValue}>
                                    {item.value}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: "space-between" }}>
                                <Typography className={classes.cardDate}>
                                    {item.date}
                                </Typography>
                                <ResponsiveContainer width="50%" height={100} style={{ gap: 3 }}>
                                    <BarChart data={chartData}>
                                        <Bar dataKey="sales" fill={theme.palette.primary.main} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;
