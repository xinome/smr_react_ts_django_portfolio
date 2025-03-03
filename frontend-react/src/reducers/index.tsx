import { combineReducers } from 'redux';
// import { INCREMENT, DECREMENT } from './actionTypes';

// initialState, reducerは後ほど別ファイルに分ける

type inisitalStateType = {
  count: number;
  isLoggedIn: boolean;
};

const initialState = {
  count: 0,
  isLoggedIn: true,
};

const reducer = (state: inisitalStateType = initialState, action: any) => {
  console.log("action: ", action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する
  reducer,
  // INCREMENT,
  // DECREMENT,
});

export default rootReducer;