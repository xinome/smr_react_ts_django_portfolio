import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchActivityTopics = createAsyncThunk(
  "topics/getActivityTopics",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/activity_topics`);
    return response.data;
  }
);

// Slices
export const activityTopicsSlice = createSlice({
  name: "activity_topics",  // stateの名前
  initialState: initialState,
  reducers: {
    getactivityTopics: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityTopics.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchActivityTopics.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchActivityTopics.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getactivityTopics } = activityTopicsSlice.actions;

export default activityTopicsSlice.reducer;