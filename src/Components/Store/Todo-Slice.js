import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/todo", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwt") || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const todos = await response.json();
    return todos;
  } catch (error) {
    return error.message;
  }
});

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/todo/${todoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("jwt") || "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      return todoId; // Return the id of the deleted todo to remove it from the state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodoAsync = createAsyncThunk(
  "todo/createTodo",
  async (todo, { rejectWithValue }) => {
    console.log(todo, "todo")
    try {
      const response = await fetch("http://localhost:3000/api/v1/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("jwt") || "",
        },
        body: JSON.stringify({description:todo}),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo = await response.json();
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (todo, { rejectWithValue }) => {
    console.log(todo, "todo")
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/todo/${todo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("jwt") || "",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      return updatedTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.todos.push(action.payload);
        state.error = null;
      })
      .addCase(createTodoAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
      
  },
});

export const { addTodo, deleteTodo, updateTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
