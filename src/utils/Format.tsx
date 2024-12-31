export const formatTime = (time: any) => {
    if (time) {
        const [hour, minute] = time.split(":");
        const suffix = +hour >= 12 ? "PM" : "AM";
        const formattedHour = +hour % 12 || 12; // Convert hour to 12-hour format
        return `${formattedHour}:${minute} ${suffix}`;
    }
};

export const formatDate = (dateString: any) => {
    const date = new Date(dateString); // Convert string to Date object
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year} 12:00:00 AM`;
};
