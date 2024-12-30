import { getRequest, putRequest, postWithFormRequest } from './index';

export const SignInUser = (payload: LogInPayload) => getRequest(`/users/login?username=${payload.email}&password=${payload?.password}`)


// Create New Auction
export const createAuction = (payload: FormData) =>
    postWithFormRequest('/auctions/create', payload);

// Get Current Auctions
export const getCurrentAuctions = () =>
    getRequest('/auctions/currentauctions');

// Edit Auction
export const editAuction = (payload: FormData) =>
    putRequest('/auctions/update', payload);
