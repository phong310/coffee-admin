import { createSlice } from '@reduxjs/toolkit'

const snackSlice = createSlice({
    name: "snack",
    initialState: {
        snackList: {
            allSnacks: null,
            isFetching: false,
            error: false,
        },

    },
    reducers: {
        // // Snacks
        getSnackStart: (state) => {
            state.snackList.isFetching = true;
        },

        getSnackSuccess: (state, actions) => {
            state.snackList.isFetching = false;
            state.snackList.allSnacks = actions.payload;
            state.snackList.error = false;
        },

        getSnackFaild: (state) => {
            state.snackList.isFetching = false;
            state.snackList.error = true
        },
    }
});

export const {
    getSnackStart,
    getSnackSuccess,
    getSnackFaild,
} = snackSlice.actions;

export default snackSlice.reducer