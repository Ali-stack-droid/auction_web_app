import { getRequest, putRequest, postWithFormRequest } from './index';

export const SignInUser = (payload: LogInPayload) => getRequest(`/users/login?username=${payload.email}&password=${payload?.password}`)

// Create New Auction
export const createAuction = (payload: FormData) => postWithFormRequest('/auctions/create', payload);
export const getCurrentAuctions = () => getRequest('/auctions/currentauctions');
export const getPastAuctions = () => getRequest('/auctions/pastauctions');
export const editAuction = (payload: any) => postWithFormRequest('/auctions/update', payload);
export const deleteAuction = (id: any) => getRequest(`/auctions/delete?id=${id}`);

// Create Lots
export const createLot = (payload: any) => postWithFormRequest('/lots/create', payload);
export const getCurrentLots = () => getRequest('/lots/currentlots');
export const getPastLots = () => getRequest('/lots/pastlots');
export const getLotsByAuctionId = (id: any) => getRequest(`/lots/lotsbyauctionid?id=${id}`);
export const deleteLot = (id: any) => getRequest(`/lots/delete?id=${id}`);
export const getLotDetails = (id: any) => getRequest(`/lots/lotdetails?id=${id}`);
export const moveLotToAuction = (lotId: any, newAuctionId: any) => putRequest(`/lots/movelot?id=${lotId}&newauctionid=${newAuctionId}`);

// Place Bids
export const placeBid = (payload: any) => postWithFormRequest('/lots/newbid', payload);
export const getLotWinner = (id: any) => getRequest(`/lots/lotwinner?id=${id}`);
