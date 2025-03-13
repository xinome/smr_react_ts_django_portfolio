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
    const response = await axios.get(`${BASE_API_URL}/project_topics`);
    return response.data;
  }
);

// Slices
export const projectTopicsSlice = createSlice({
  name: "project_topics",  // stateの名前
  initialState: initialState,
  reducers: {
    getprojectTopics: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
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
export const { getprojectTopics } = projectTopicsSlice.actions;

export default projectTopicsSlice.reducer;