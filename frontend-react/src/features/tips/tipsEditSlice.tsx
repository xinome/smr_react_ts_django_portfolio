import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
  status: "",
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */

// 作成処理
export const fetchCreateTips = createAsyncThunk(
  "create_tips",  // type: 内部処理名
  async (data) => {
    console.log("data: ", data);
    const connect_url = `${BASE_API_URL}/tips/create/`;
    console.log("connect_url: ", connect_url);

    try {
      const response = await axios.post(connect_url, data);
      console.log("createTips: ", response);
      return response.data;
    }
    catch (error) {
      console.log("createTips_error: ", error);
    }
  }
);

// 更新処理
export const fetchUpdateTips = createAsyncThunk(
  "update_tips_detail",  // type: 内部処理名
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

// 削除処理
export const fetchDeleteTips = createAsyncThunk(
  "delete_tips_detail",  // type: 内部処理名
  async (params: { tips_id: string }) => {
    console.log("params: ", params);
    const connect_url = `${BASE_API_URL}/tips/delete/${params.tips_id}`;
    console.log("connect_url: ", connect_url);

    const response = await axios.post(connect_url);
    return response.data;
  }
);

// Slices
export const tipsEditSlice = createSlice({
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
      .addCase(fetchCreateTips.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
          status: "loading",
        };
      })
      .addCase(fetchCreateTips.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          isLoading: false,
          status: "success",
        };
      })
      .addCase(fetchCreateTips.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
          status: "failed",
        };
      });

      builder
      .addCase(fetchUpdateTips.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
          status: "loading",
        };
      })
      .addCase(fetchUpdateTips.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          isLoading: false,
          status: "success",
        };
      })
      .addCase(fetchUpdateTips.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
          status: "failed",
        };
      });

    builder
    .addCase(fetchDeleteTips.pending, (state) => {
      console.log("pending..");
      return {
        ...state,
        isLoading: true,
        status: "loading",
      };
    })
    .addCase(fetchDeleteTips.fulfilled, (state, action) => {
      console.log("fulfilled: ", action.payload);
      return {
        ...state,
        isLoading: false,
        status: "success",
      };
    })
    .addCase(fetchDeleteTips.rejected, (state) => {
      console.log("rejected..");
      return {
        ...state,
        isLoading: false,
        status: "failed",
      };
    });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
// export const { getAccountList, updateAccountList } = mypageSlice.actions;
export default tipsEditSlice.reducer;