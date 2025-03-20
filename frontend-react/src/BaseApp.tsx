import React from "react";
import { useLocation } from "react-router-dom";
// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';

import './BaseApp.scss';

// Material UI(MUI) components
import { Avatar, Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { createTheme } from '@mui/material/styles';

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

  // const isLoggedIn = false;
  // const BASE_API_URL = "http://localhost:8000/api";

  type ProjectType = {
    id: number,
    date: string,
    content: string,
    category: number,
  }[];

  type PortfolioType = {
    id: number,
    date: string,
    content: string,
    category: number,
  }[];

  type ActivityType = {
    id: number,
    date: string,
    content: string,
    category: number,
  }[];

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