import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "userList",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },

        roles: {
            allRoles: null,
            isFetching: false,
            error: false
        },

        permissions: {
            allPermission: null,
            isFetching: false,
            error: false
        }

    },
    reducers: {
        // ACCOUNT
        getUserStart: (state) => {
            state.users.isFetching = true;
        },

        getUserSuccess: (state, actions) => {
            state.users.isFetching = false;
            state.users.allUsers = actions.payload;
            state.users.error = false;
        },

        getUserFaild: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        // ROLE
        getRoleStart: (state) => {
            state.roles.isFetching = true;
        },

        getRoleSuccess: (state, actions) => {
            state.roles.isFetching = false;
            state.roles.allRoles = actions.payload;
            state.roles.error = false;
        },

        getRoleFaild: (state) => {
            state.roles.isFetching = false;
            state.roles.error = true;
        },

        // PERMISSIONS
        getPermissionStart: (state) => {
            state.permissions.isFetching = true;
        },

        getPermissionSuccess: (state, actions) => {
            state.permissions.isFetching = false;
            state.permissions.allPermission = actions.payload;
            state.permissions.error = false;
        },

        getPermissionFaild: (state) => {
            state.permissions.isFetching = false;
            state.permissions.error = true;
        }


    }
});

export const { getUserStart, getUserSuccess, getUserFaild, getRoleStart, getRoleSuccess, getRoleFaild, getPermissionStart, getPermissionSuccess, getPermissionFaild } = userSlice.actions;

export default userSlice.reducer