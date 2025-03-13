import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

/** データ取得非同期処理 */
export const fetchAccountList = createAsyncThunk(
  "account/getAccountList",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/users/${id}`);
    return response.data;
  }
);

// Slices
export const accountSlice = createSlice({
  name: "mypage_account",  // stateの名前
  initialState: initialState,
  reducers: {
    getAccountList: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountList.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchAccountList.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchAccountList.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getAccountList } = accountSlice.actions;
export default accountSlice.reducer;
