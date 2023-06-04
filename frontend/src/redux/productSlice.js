import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "products",
    initialState: {
        drinkList: {
            allDrinks: null,
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
    }
});

export const {
    getDrinkStart,
    getDrinkSuccess,
    getDrinkFaild,
} = productSlice.actions;

export default productSlice.reducer