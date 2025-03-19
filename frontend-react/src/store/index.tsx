import { combineReducers } from 'redux';

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Reducers
import authReducer from '../features/account/authSlice';
import mypageAccountReducer from '../features/account/mypageSlice';
import mypageProfileReducer from '../features/mypage/mypageProfileSlice';

import projectTopicsReducer from '../features/topics/projectTopicsSlice';
import portfolioTopicsReducer from '../features/topics/portfolioTopicsSlice';
import activityTopicsReducer from '../features/topics/activityTopicsSlice';

import tipsReducer from '../features/tips/tipsSlice';
import tipsCategorizeReducer from '../features/tips/tipsCategorizeSlice';
import tipsDetailReducer from '../features/tips/tipsDetailSlice';

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する

  // account
  authReducer,

  // mypage
  mypageAccountReducer,
  mypageProfileReducer,

  // topics
  projectTopicsReducer,
  portfolioTopicsReducer,
  activityTopicsReducer,

  // tips
  tipsReducer,
  tipsCategorizeReducer,
  tipsDetailReducer,
});

// Store
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;