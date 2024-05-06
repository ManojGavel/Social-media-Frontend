import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  editTodoDialog: false,
  selectedTodo: null,
};

export const patchTodos = createAsyncThunk("home/fetchTodos", async (value) => {
    console.log(value, "value")
    try {
        const response = await fetch(
            `http://localhost:3000/api/v1/todo/${value._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("jwt")}`,
                },
                body: JSON.stringify({
                    description: value.description,
                }),
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    openEditDialog: (state, action) => {
      state.editTodoDialog = true;
    },
    closeEditDialog: (state, action) => {
      state.editTodoDialog = false;
    },
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    setEditTodo: (state, action) => {
      state.selectedTodo.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(patchTodos.fulfilled, (state, action) => {
      state.selectedTodo = action.payload;
    });
  },
});

export const { openEditDialog, closeEditDialog, setSelectedTodo, setEditTodo } =
  homeSlice.actions;
export default homeSlice.reducer;
