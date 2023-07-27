import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

const name = 'users';
const initialState = createInitialState();
const moreActions = createMoreActions();
const slice = createSlice({
    name,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(moreActions.register.fulfilled, (state, action) => {
            // Add the new user to the list
            state.list = [...state.list, action.payload];
        });
    },
});

function createInitialState() {
    return {
        list: []
    }
}

function createMoreActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    const register = createAsyncThunk(
        `${name}/register`,
        async function (user, { rejectWithValue }) {
            try {
                const response = await fetchWrapper.post(`${baseUrl}/register`, user);

                const { documents, ...userWithoutDocuments } = user;

                console.log("FRONT END", user);

                return userWithoutDocuments;
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    );

    return {
        register: register,
    };
}

export const userActions = { ...slice.actions, ...moreActions };
export const usersReducer = slice.reducer;