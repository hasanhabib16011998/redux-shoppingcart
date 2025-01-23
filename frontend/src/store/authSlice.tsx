import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Define the type for the decoded JWT user data
interface DecodedUser {
  name: string;
  email: string;
  _id: string;
}

// Define the type for the auth state
interface AuthState {
  token: string | null;
  name: string;
  email: string;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  userLoaded: boolean;
}

// Define the type for the register user input values
interface RegisterUserValues {
  name: string;
  email: string;
  password: string;
}

// Initial state with defined types
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

// Async thunk for user registration
export const registeredUser = createAsyncThunk(
  "auth/registerUser",
  async (user: RegisterUserValues, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      localStorage.setItem("token", response.data.token);
      return response.data.token;  // Return token only
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// Create auth slice with TypeScript support
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.name = "";
      state.email = "";
      state._id = "";
      state.userLoaded = false;
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registeredUser.pending, (state) => {
        state.registerStatus = "pending";
      })
      .addCase(registeredUser.fulfilled, (state, action: PayloadAction<string>) => {
        if (action.payload) {
          const user: DecodedUser = jwtDecode(action.payload);
          state.token = action.payload;
          state.name = user.name;
          state.email = user.email;
          state._id = user._id;
          state.registerStatus = "success";
        }
      })
      .addCase(registeredUser.rejected, (state, action: PayloadAction<any>) => {
        state.registerStatus = "rejected";
        state.registerError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
