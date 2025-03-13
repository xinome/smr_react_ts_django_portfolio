import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// isLoggedInでログイン状態を管理、最後に実装予定
const initialState = {
  isLoading: false,
  isLoggedIn: true,
  items: [],
};

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

/** データ取得非同期処理 */
export const fetchAuth = createAsyncThunk(
  "account/manageAuth",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/users/${id}`);
    return response.data;
  }
);

// Slices
export const authSlice = createSlice({
  name: "auth",  // stateの名前
  initialState: initialState,
  reducers: {
    getAuth: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchAuth.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getAuth } = authSlice.actions;
export default authSlice.reducer;