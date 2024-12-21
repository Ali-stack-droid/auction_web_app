import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './UserSlice';

import storage from 'redux-persist/lib/storage'; 

// Redux Persist configuration
const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),



});

const store = configureStore({
    reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
