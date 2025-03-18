import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchPortfolioTopics = createAsyncThunk(
  "topics/getPortfolioTopics",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/portfolio_topics`);
    return response.data;
  }
);

// Slices
export const portfolioTopicsSlice = createSlice({
  name: "portfolio_topics",  // sliceの名前
  initialState: initialState,
  reducers: {
    getPortfolioTopics: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },

    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }     
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioTopics.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchPortfolioTopics.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchPortfolioTopics.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getPortfolioTopics } = portfolioTopicsSlice.actions;

export default portfolioTopicsSlice.reducer;