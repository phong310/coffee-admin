import { createSlice } from '@reduxjs/toolkit'

const cateSlice = createSlice({
    name: "category",
    initialState: {
        cateList: {
            allCate: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getCateStart: (state) => {
            state.cateList.isFetching = true;
        },

        getCateSuccess: (state, actions) => {
            state.cateList.isFetching = false;
            state.cateList.allCate = actions.payload;
            state.cateList.error = false;
        },

        getCateFaild: (state) => {
            state.cateList.isFetching = false;
            state.cateList.error = true
        }

    }
});

export const { getCateStart, getCateSuccess, getCateFaild } = cateSlice.actions;

export default cateSlice.reducer