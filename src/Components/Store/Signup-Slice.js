import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    error: null,
};

export const signupUser = createAsyncThunk(
    "signup/signupUser",
    async ({ name,email,password,confirmPassword }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/user", {
                method: "POST",
                credentials: 'include', // Important for cookies
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });

            if (!response.ok) {
                throw new Error("Signup failed");
            }

            const user = await response.json();
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
    });

export default signupSlice.reducer;