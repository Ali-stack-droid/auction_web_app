import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface
export interface User {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    Password: string;
}

// Initial state type
interface UserState {
    user: User | null;
}

// Initial state
const initialState: UserState = {
    user: null,
};

// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer to set user data
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

// Export actions
export const { setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
