import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: "orderList",
    initialState: {
        orders: {
            allOrder: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getOrderStart: (state) => {
            state.orders.isFetching = true;
        },

        getOrderSuccess: (state, actions) => {
            state.orders.isFetching = false;
            state.orders.allOrder = actions.payload;
            state.orders.error = false;
        },

        getOrderFaild: (state) => {
            state.orders.isFetching = false;
            state.orders.error = true
        }


    }
});

export const { getOrderStart, getOrderSuccess, getOrderFaild } = orderSlice.actions;

export default orderSlice.reducer