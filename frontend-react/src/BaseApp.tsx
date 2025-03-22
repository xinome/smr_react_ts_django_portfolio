import React from "react";
import { useLocation } from "react-router-dom";

import './BaseApp.scss';
import { Routes, Route } from 'react-router-dom';

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

  const pathname = useLocation().pathname.replaceAll('/', '');
  console.log("useLocation.pathname: ", pathname);

  // 仮置き: ログインユーザID
  const current_user_id = 1;

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
          <Route path="/mypage/" element={<MypageIndex user_id={current_user_id} />} />
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
