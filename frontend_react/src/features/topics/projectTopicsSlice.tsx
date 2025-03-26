import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchProjectTopics = createAsyncThunk(
  "topics/getProjectTopics",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/project_topics/`);
    return response.data;
  }
);

// Slices
export const projectTopicsSlice = createSlice({
  name: "project_topics",  // sliceの名前
  initialState: initialState,
  reducers: {
    getProjectTopics: (state, action) => {
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
    builder
      .addCase(fetchProjectTopics.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchProjectTopics.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchProjectTopics.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getProjectTopics } = projectTopicsSlice.actions;

export default projectTopicsSlice.reducer;