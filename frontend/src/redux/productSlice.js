import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "product",
    initialState: {
        drinkList: {
            allDrinks: null,
            isFetching: false,
            error: false,
        },

        snackList: {
            allSnacks: null,
            isFetching: false,
            error: false,
        },

        bakeryList: {
            allBakery: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // Drinks
        getDrinkStart: (state) => {
            state.drinkList.isFetching = true;
        },

        getDrinkSuccess: (state, actions) => {
            state.drinkList.isFetching = false;
            state.drinkList.allDrinks = actions.payload;
            state.drinkList.error = false;
        },

        getDrinkFaild: (state) => {
            state.drinkList.isFetching = false;
            state.drinkList.error = true
        },

        // Snacks
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

        // Bakery
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
    getDrinkStart,
    getDrinkSuccess,
    getDrinkFaild,
    getSnackStart,
    getSnackSuccess,
    getSnackFaild,
    getBakeryStart,
    getBakerySuccess,
    getBakeryFaild
} = productSlice.actions;

export default productSlice.reducer