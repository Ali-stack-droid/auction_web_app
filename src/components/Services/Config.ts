import axios from 'axios';

const BASE_URL = `https://auction.sttoro.com/api/`;
// const BASE_URL = `https://parkersauction.com/api/`;

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

client.interceptors.request.use(
    async config => {
        return config;
    },
    err => {
        console.log(err)
        return Promise.reject(err);
    },
);

export { client };