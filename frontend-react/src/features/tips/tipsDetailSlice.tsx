import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchTipsDetail = createAsyncThunk(
  "get_tips_detail_all",  // type: 内部処理名、一意でないとだめ
  async (params: { tips_category: string; tips_id: string }) => {
    console.log("params: ", params);
    const connect_url = `${BASE_API_URL}/tips/${params.tips_category}/${params.tips_id}`;
    console.log("connect_url: ", connect_url);

    const response = await axios.get(connect_url);
    return response.data;
  }
);

// Slices
export const tipsDetailSlice = createSlice({
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
      .addCase(fetchTipsDetail.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchTipsDetail.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchTipsDetail.rejected, (state) => {
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
export default tipsDetailSlice.reducer;