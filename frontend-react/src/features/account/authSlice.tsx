import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// isLoggedInでログイン状態を管理、最後に実装予定
const initialState = {
  isLoading: false,
  isLoggedIn: true,
  items: [],
};

// const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchAuth = createAsyncThunk(
  "account/manageAuth",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/auth_account/${id}`);
    console.log("fetchAuth: ", response);
    return response.data;
  }
);

// Slices
export const authSlice = createSlice({
  name: "auth",  // sliceの名前
  initialState: initialState,
  reducers: {
    getAuth: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    // login: (state, action) => {
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //   };
    // },
    // logout: (state, action) => {
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //   };
    // },

    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        console.log("pending");
        return {
          ...state,
          isLoading: true,
          isLoggedIn: false,
        };
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          isLoggedIn: true,
        };
      })
      .addCase(fetchAuth.rejected, (state) => {
        console.log("rejected");
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getAuth } = authSlice.actions;
export default authSlice.reducer;