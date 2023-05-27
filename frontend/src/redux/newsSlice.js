import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
    name: "newsList",
    initialState: {
        news: {
            allNews: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getNewsStart: (state) => {
            state.news.isFetching = true;
        },

        getNewsSuccess: (state, actions) => {
            state.news.isFetching = false;
            state.news.allNews = actions.payload;
            state.news.error = false;
        },

        getNewsFaild: (state) => {
            state.news.isFetching = false;
            state.news.error = true
        }
    }
})

export const { getNewsStart, getNewsSuccess, getNewsFaild } = newsSlice.actions;

export default newsSlice.reducer