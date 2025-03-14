import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

/** データ取得非同期処理 */
export const fetchAccountList = createAsyncThunk(
  "account/getAccountList",   // type: 内部処理名、一意でないとだめ
  async (userId: number) => {
    const response = await axios.get(`${BASE_API_URL}/users/${userId}`);
    return response.data;
  }
);

// Slices
export const accountSlice = createSlice({
  name: "mypage_account",  // sliceの名前
  initialState: initialState,
  reducers: {
    getAccountList: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },

    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    // TODO: エラー発生時の処理も追加する
    builder
      .addCase(fetchAccountList.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchAccountList.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchAccountList.rejected, (state) => {
        console.log("pending..");
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
