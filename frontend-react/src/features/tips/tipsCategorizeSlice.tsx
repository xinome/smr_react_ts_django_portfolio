import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchTipsCategorizeList = createAsyncThunk(
  "tips_list",  // type: 内部処理名、一意でないとだめ
  async (category_path) => {
    const connect_url = `${BASE_API_URL}/tips/${category_path}/`;
    console.log("connect_url: ", connect_url);

    const response = await axios.get(`${BASE_API_URL}/tips/${category_path}/`);
    return response.data;
  }
);

// Slices
export const tipsCategorizeSlice = createSlice({
  name: "tips",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    // TODO: エラー発生時の処理も追加する
    builder
      .addCase(fetchTipsCategorizeList.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchTipsCategorizeList.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchTipsCategorizeList.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
// export const { getAccountList, updateAccountList } = mypageSlice.actions;
export default tipsCategorizeSlice.reducer;
