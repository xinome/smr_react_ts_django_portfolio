import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchGetTipsToEdit = createAsyncThunk(
  "tips_list",  // type: 内部処理名、一意でないとだめ
  async (params: { tips_id: string }) => {
    console.log("params: ", params);
    const connect_url = `${BASE_API_URL}/tips/update/${params.tips_id}`;
    console.log("connect_url: ", connect_url);

    const response = await axios.get(connect_url);
    return response.data;
  }
);

// 更新処理
export const fetchUpdateTips = createAsyncThunk(
  "update_tips_list",  // type: 内部処理名、一意でないとだめ
  async (data: { id: string; [key: string]: any }) => {

    const tips_id = data.id;

    const connect_url = `${BASE_API_URL}/tips/update/${tips_id}`;
    console.log("connect_url: ", connect_url);

    try {
      const response = await axios.post(connect_url, data);
      console.log("updateTips: ", response);
      return response.data;
    }
    catch (error) {
      console.log("updateTips_error: ", error);
    }
  }
);

// Slices
export const tipsDetailSlice = createSlice({
  name: "tips_detail",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    // TODO: エラー発生時の処理も追加する
    builder
      .addCase(fetchGetTipsToEdit.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchGetTipsToEdit.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchGetTipsToEdit.rejected, (state) => {
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