import { getRequest, putRequest, postWithFormRequest } from './index';

export const SignInUser = (payload: LogInPayload) => getRequest(`/users/login?username=${payload.email}&password=${payload?.password}`)

// Dashboard Methods
export const getDashboardStatistics = () => getRequest('/users/dashboard');

// Auction Methods
export const createAuction = (payload: FormData) => postWithFormRequest('/auctions/create', payload);
export const getCurrentAuctions = () => getRequest('/auctions/currentauctions');
export const getPastAuctions = () => getRequest('/auctions/pastauctions');
export const editAuction = (payload: any) => postWithFormRequest('/auctions/update', payload);
export const deleteAuction = (id: any) => getRequest(`/auctions/delete?id=${id}`);
export const getAuctionDetailById = (id: any) => getRequest(`/lots/auctiondetailbyid?id=${id}`);

// Lot Methos
export const createLot = (payload: any) => postWithFormRequest('/lots/create', payload);
export const getCurrentLots = () => getRequest('/lots/currentlots');
export const getPastLots = () => getRequest('/lots/pastlots');
export const getLotsByAuctionId = (id: any) => getRequest(`/lots/lotsbyauctionid?id=${id}`);
export const getLotDetailsById = (id: any) => getRequest(`/lots/lotdetails?id=${id}`);
export const getWinnerByLotId = (id: any) => getRequest(`/lots/lotwinner?id=${id}`);
export const deleteLot = (id: any) => getRequest(`/lots/delete?id=${id}`);
export const getLotDetails = (id: any) => getRequest(`/lots/lotdetails?id=${id}`);
export const moveLotToAuction = (lotId: any, newAuctionId: any) => putRequest(`/lots/movelot?id=${lotId}&newauctionid=${newAuctionId}`);
export const getLotWinner = (id: any) => getRequest(`/lots/lotwinner?id=${id}`);
export const getBiddersByLotId = (id: any) => getRequest(`/lots/biddersbylot?id=${id}`);

// Bidding Methods
export const placeBid = (payload: any) => postWithFormRequest('/lots/newbid', payload);


// Payment Tracking Methods
export const getPendingInvoices = () => getRequest('/invoices/pending');
export const getPaidInvoices = () => getRequest('/invoices/paid');

// Location Methods
export const getCurrentLocations = () => getRequest('/auctions/getcurrentlocations');
export const getPastLocations = () => getRequest('/auctions/getpastlocations');

export const getCurrentAuctionsByLocation = (location: any) => getRequest(`/auctions/currentlocationauctions?loc=${location}`);
export const getPastAuctionsByLocation = (location: any) => getRequest(`/auctions/pastlocationauctions?loc=${location}`);


