import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import store from "./store";

import { getAuth } from "./features/account/authSlice";

import './BaseApp.scss';

// コンポーネント
import Login from "./pages/Login";
import Layout from "./pages/Layout";

// ページ
import DashBoard from './pages/DashBoard';
import MyPageIndex from './pages/mypage/MyPageIndex';
import EditProfile from "./pages/mypage/EditProfile";

import TipsIndex from "./pages/tips/TipsIndex";
import TipsCategorize from "./pages/tips/TipsCategorize";
import TipsDetail from "./pages/tips/TipsDetail";
import TipsCreate from "./pages/tips/TipsCreate";
import TipsEdit from "./pages/tips/TipsEdit";

const BaseApp = () => {

  const userAuth = useSelector((state: any) => state.authReducer);
  const usersList = useSelector((state: any) => state.authReducer.items);

  // ログインユーザID
  const current_user_id = usersList.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ローカルストレージからアクセストークンを取得
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(getAuth(user));  // Reduxに復元
    }
  }, []);

  useEffect(() => {
    console.log("userAuth: ", userAuth);
    console.log("usersList: ", usersList);

    // isLoggedIn優先判定
    if (!userAuth.isLoggedIn && location.pathname !== "/login/") {
      navigate('/login/');
    }

    // ログイン済みならdashboardへ
    if (userAuth.isLoggedIn && location.pathname === "/") {
      navigate('/dashboard/');
    }
  }, [usersList, location, navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/login/" element={<Login />} />

        {/* ログイン時のレイアウト */}
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard/" element={<DashBoard />} />
          <Route path="/mypage/" element={<MyPageIndex userId={current_user_id} />} />
          <Route path="/mypage/edit_profile/" element={<EditProfile userId={current_user_id} />} />
          <Route path="/tips/" element={<TipsIndex />} />
          <Route path="/tips/create/" element={<TipsCreate />} />
          <Route path="/tips/edit/:tips_id" element={<TipsEdit />} />
          <Route path="/tips/:tips_category" element={<TipsCategorize />} />
          <Route path="/tips/:tips_category/:tips_id" element={<TipsDetail />} />
        </Route>
        {/* <Route path="*" element={<p>Path not resolved</p>} /> */}
      </Routes>

      {/* <BaseHeader user_id={current_user_id} />
      <Box className='app-container'>
        <BaseSideMenu path={pathname} />
        <Routes>
          <Route path="/dashboard/" element={<DashBoard />} /> 
          <Route path="/mypage/" element={<MyPageIndex user_id={current_user_id} />} />
          <Route path="/mypage/edit_profile/" element={<EditProfile user_id={current_user_id} />} />
          <Route path="/tips/" element={<TipsIndex />} />
          <Route path="/tips/create/" element={<TipsCreate />} />
          <Route path="/tips/edit/:tips_id" element={<TipsEdit />} />
          <Route path="/tips/:tips_category" element={<TipsCategorize />} />
          <Route path="/tips/:tips_category/:tips_id" element={<TipsDetail />} />
        </Routes>
      </Box> */}
    </div>
  );
}

export default BaseApp;
