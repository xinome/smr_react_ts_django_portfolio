import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";
// const BASE_API_URL = "https://jsonplaceholder.typicode.com";

/** データ取得非同期処理 */
export const fetchMypageAccountList = createAsyncThunk(
  "get_mypage_account",   // type: 内部処理名、一意でないとだめ
  async (userId: number) => {
    const response = await axios.get(`${BASE_API_URL}/mypage/${userId}`);
    return response.data;
  }
);

// Slices
export const mypageSlice = createSlice({
  name: "mypage",  // sliceの名前
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
      .addCase(fetchMypageAccountList.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchMypageAccountList.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchMypageAccountList.rejected, (state, error) => {
        console.log("rejected: ", error);
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
// export const { getAccountList, updateAccountList } = mypageSlice.actions;
export const { getAccountList } = mypageSlice.actions;
export default mypageSlice.reducer;
