import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import './BaseApp.scss';

// Material UI(MUI) components
import { Box } from '@mui/material';

// コンポーネント
import BaseHeader from "./components/BaseHeader";
import BaseSideMenu from "./components/BaseSideMenu";

// ページ
import DashBoard from './pages/DashBoard';
import MyPageIndex from "./pages/mypage/MyPageIndex";
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
      <BaseHeader userId={current_user_id} />
      <Box className='app-container'>
        
        <BaseSideMenu />

        <Routes>
          <Route path="/dashboard/" element={<DashBoard />} /> 
          <Route path="/mypage/" element={<MyPageIndex userId={current_user_id} />} />
          <Route path="/mypage/edit_profile/" element={<EditProfile userId={current_user_id} />} />
          <Route path="/tips/" element={<TipsIndex />} />
          <Route path="/tips/:tips_category" element={<TipsCategorize />} />
          <Route path="/tips/:tips_category/:tips_id" element={<TipsDetail />} />
          <Route path="/tips/create/" element={<TipsCreate />} />
          <Route path="/tips/edit/:tips_id" element={<TipsEdit />} />
        </Routes>

      </Box>
    </div>
  );
}

export default BaseApp;