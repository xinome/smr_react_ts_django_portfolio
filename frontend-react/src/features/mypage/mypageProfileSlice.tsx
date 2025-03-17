import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

// const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */

// データ取得、不要かも
export const fetchGetMypageProfile = createAsyncThunk(
  "get_mypage_profile",  // type: 内部処理名、一意でないとだめ
  async (userId: number) => {
    // 仮置き
    // const response = await axios.get(`${BASE_API_URL}/mypage/edit_profile/${id}/`);
    const response = await axios.get(`${BASE_API_URL}/mypage/user_profile/${userId}/`);
    return response.data[0];
  }
);

// 更新
export const fetchUpdateMypageProfile = createAsyncThunk(
  "update_mypage_profile",
  async (id, data) => {
    console.log("id: ", id);
    console.log("data: ", data);

    const response = await axios.patch(`${BASE_API_URL}/mypage/edit_profile/${id}/`, data);
    return response.data;
  }
);

// Slices
export const mypageProfileSlice = createSlice({
  name: "mypage_profile",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }

    getMypageProfile: (state, action) => {
      axios
        .get(`${BASE_API_URL}/mypage/user_profile/${action.payload}/`)
        .then((response) => {
          console.log("getMypageProfile: ", response);
          state.items = response.data;
        })
        .catch((error) => {
          console.log("getMypageProfile_error: ", error);
        });
    },

    updateMypageProfile: (state, action) => {
      console.log("state: ", state);
      console.log("action: ", action);

      axios
        .patch(`${BASE_API_URL}/mypage/edit_profile/${action.payload.id}/`, action.payload)
        .then((response) => {
          console.log("updateMypageProfile: ", response);
          state.items = response.data;
        })
        .catch((error) => {
          console.log("updateMypageProfile_error: ", error);
        });
    }
    
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    // TODO: エラー発生時の処理も追加する
    builder
      .addCase(fetchGetMypageProfile.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchGetMypageProfile.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchGetMypageProfile.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
        };
      });

    builder
      .addCase(fetchUpdateMypageProfile.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchUpdateMypageProfile.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchUpdateMypageProfile.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getMypageProfile, updateMypageProfile } = mypageProfileSlice.actions;
export default mypageProfileSlice.reducer;