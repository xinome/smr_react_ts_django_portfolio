import { combineReducers } from 'redux';
// import { INCREMENT, DECREMENT } from './actionTypes';

import authReducer from '../features/account/authSlice';
import mypageAccountReducer from '../features/account/mypageSlice';
import mypageProfileReducer from '../features/mypage/mypageProfileSlice';

import projectTopicsReducer from "../features/topics/projectTopicsSlice";
import activityTopicsReducer from "../features/topics/activityTopicsSlice";
import portfolioTopicsReducer from "../features/topics/portfolioTopicsSlice";

// initialState, reducerは後ほど別ファイルに分ける

type inisitalStateType = {
  count: number;
  isLoggedIn: boolean;
};

// const initialState = {
//   count: 0,
//   isLoggedIn: true,
// };

// const loginReducer = (state: inisitalStateType = initialState, action: any) => {
//   console.log("action: ", action);
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         isLoggedIn: true,
//       };

//     case "LOGOUT":
//       return {
//         ...state,
//         isLoggedIn: false,
//       };

//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する
  // loginReducer,
  // INCREMENT,
  // DECREMENT,
  authReducer,
  mypageAccountReducer,
  mypageProfileReducer,
  
  projectTopicsReducer,
  activityTopicsReducer,
  portfolioTopicsReducer,
});

export default rootReducer;