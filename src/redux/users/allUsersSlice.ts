import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    allUsers: User[]; 
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    allUsers: [], 
    error: null,
    loading: false,
};

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
      
        fetchUsersStart: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.allUsers = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = allUsersSlice.actions;

export default allUsersSlice.reducer;
