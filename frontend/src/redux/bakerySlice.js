import { createSlice } from '@reduxjs/toolkit'

const bakerySlice = createSlice({
    name: "bakery",
    initialState: {
        bakeryList: {
            allBakery: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // // Bakery
        getBakeryStart: (state) => {
            state.bakeryList.isFetching = true;
        },

        getBakerySuccess: (state, actions) => {
            state.bakeryList.isFetching = false;
            state.bakeryList.allBakery = actions.payload;
            state.bakeryList.error = false;
        },

        getBakeryFaild: (state) => {
            state.bakeryList.isFetching = false;
            state.bakeryList.error = true
        },

    }
});

export const {
    getBakeryStart,
    getBakerySuccess,
    getBakeryFaild
} = bakerySlice.actions;

export default bakerySlice.reducer