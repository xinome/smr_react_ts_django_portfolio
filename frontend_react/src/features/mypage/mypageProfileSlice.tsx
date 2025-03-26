import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
  status: "",
};

// データ型の定義
export interface UpdateProfileData {
  id: number;
  name: string;
  account_id: string;
  email?: string;
  zip?: string;
  address?: string;
  phone?: string;
}

// const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */

// 編集前のデータ取得
export const fetchGetMypageProfile = createAsyncThunk(
  "get_mypage_profile",  // type: 内部処理名、一意でないとだめ
  async (userId: number) => {
    console.log("userId: ", userId);
    const response = await axios.get(`${BASE_API_URL}/mypage/user_profile/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

// 更新
export const fetchUpdateMypageProfile = createAsyncThunk(
  "update_mypage_profile",
  async (data: UpdateProfileData) => {
    console.log("data: ", data);
    console.log("data.id: ", data.id);

    // const response = await axios.post(`${BASE_API_URL}/mypage/edit_profile/${data.id}`, data);
    // 変更のあったデータを更新する
    // const response = await axios.post(`${BASE_API_URL}/mypage/edit_profile/${data.id}`, data);
    // return response.data;

    try {
      const response = await axios.post(`${BASE_API_URL}/mypage/edit_profile/${data.id}`, data);
      console.log("updateMypageProfile: ", response);
      return response.data;
    }
    catch (error) {
      console.log("updateMypageProfile_error: ", error);
    }
  }
);

// Slices
export const mypageProfileSlice = createSlice({
  name: "mypage_profile",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }

    // getMypageProfile: (state, action) => {
    //   axios
    //     .get(`${BASE_API_URL}/mypage/user_profile/${action.payload}/`)
    //     .then((response) => {
    //       console.log("getMypageProfile: ", response);
    //       state.items = response.data;
    //     })
    //     .catch((error) => {
    //       console.log("getMypageProfile_error: ", error);
    //     });
    // },

    // updateMypageProfile: (state, action) => {
    //   console.log("state: ", state);
    //   console.log("action: ", action);

    //   axios
    //     .post(`${BASE_API_URL}/mypage/edit_profile/${action.payload.id}`, action.payload)
    //     .then((response) => {
    //       console.log("updateMypageProfile: ", response);
    //       state.items = response.data;
    //     })
    //     .catch((error) => {
    //       console.log("updateMypageProfile_error: ", error);
    //     });
    // }
    
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
          status: "loading",
        };
      })
      .addCase(fetchGetMypageProfile.fulfilled, (state, action) => {
        console.log('API payload:', action.payload);
        state.items = action.payload;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(fetchGetMypageProfile.rejected, (state, error) => {
        console.log("rejected: ", error);
        return {
          ...state,
          isLoading: false,
          status: "failed",
        };
      });

    builder
      .addCase(fetchUpdateMypageProfile.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
          status: "loading",
        };
      })
      .addCase(fetchUpdateMypageProfile.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          status: "success",
        };
      })
      .addCase(fetchUpdateMypageProfile.rejected, (state, error) => {
        console.log("rejected: ", error);
        return {
          ...state,
          isLoading: false,
          status: "failed",
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
// export const { getMypageProfile, updateMypageProfile } = mypageProfileSlice.actions;
export default mypageProfileSlice.reducer;