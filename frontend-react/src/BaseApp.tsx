import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import Axios from 'axios';

import './BaseApp.scss';
import {
  bgcolor_header, bgcolor_sidemenu,
  color_category_project, color_category_portfolio, color_category_activity,
} from './utils/ColorUtils';

// Material UI(MUI) components
import { Avatar, Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { createTheme } from '@mui/material/styles';

// コンポーネント
import BaseHeader from "./components/BaseHeader";
import BaseSideMenu from "./components/BaseSideMenu";
import DashBoardCarousel from './components/DashBoardCarousel';

// ページ
import DashBoard from './pages/DashBoard';
import MyPage from './pages/MyPage';
import EditProfile from "./pages/mypage/EditProfile";
import TipsList from "./pages/TipsList";

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

  // JSONデータを取得する
  // const [projectList, setProjectList] = useState<ProjectType>([]);
  // const [portfolioList, setPortfolioList] = useState<PortfolioType>([]);
  // const [activityList, setActivityList] = useState<ActivityType>([]);

  // const fetchProjectList = async () => {
  //   try {
  //     const response = await Axios.get(`${BASE_API_URL}/project_topics`);
  //     console.log("fetchProjectList: ", response);
  //     setProjectList(response.data);
  //   }
  //   catch (error) {
  //     console.log("fetchProjectList: ", error);
  //   }
  // }

  // const fetchPortfolioList = async () => {
  //   try {
  //     const response = await Axios.get(`${BASE_API_URL}/portfolio_topics`);
  //     console.log("fetchPortfolioList: ", response);
  //     setPortfolioList(response.data);
  //   }
  //   catch (error) {
  //     console.log("fetchPortfolioList: ", error);
  //   }
  // }

  // const fetchActivityList = async () => {
  //   try {
  //     const response = await Axios.get(`${BASE_API_URL}/activity_topics`);
  //     console.log("fetchActivityList: ", response);
  //     setActivityList(response.data);
  //   }
  //   catch (error) {
  //     console.log("fetchActivityList: ", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchProjectList();
  //   fetchPortfolioList();
  //   fetchActivityList();
  // }, []);

  // const filteredProjectList: ProjectType = projectList.filter((item) => {
  //   return item.id <= 3;
  // });
  // const filteredPortfolioList = portfolioList.filter((item) => {
  //   return item.id <= 3;
  // });
  // const filteredActivityList = activityList.filter((item) => {
  //   return item.id <= 3;
  // });

  // const getCategoryColor = (category_id: number) => {
  //   switch (category_id) {
  //     case 1:
  //       return color_category_project;
  //     case 2:
  //       return color_category_portfolio;
  //     case 3:
  //       return color_category_activity;
  //     default:
  //       return "";
  //   }
  // };

  // カテゴリーIDからカテゴリー名を取得する
  // const getCategoryName = (category_id: number) => {
  //   switch (category_id) {
  //     case 1:
  //       return "プロジェクト";
  //     case 2:
  //       return "ポートフォリオ";
  //     case 3:
  //       return "活動記録";
  //     default:
  //       return "";
  //   }
  // };

  // const menuItemStyle = {
  //   padding: '.5em 1em',
  //   margin: '0',
  //   borderBottom: '1px solid #ccc',
  // };

  const pathname = useLocation().pathname.replaceAll('/', '');
  console.log("useLocation.pathname: ", pathname);

  // 仮置き: ログインユーザID
  const current_user_id = 1;
  
  return (
    <div className="app">
      {/* <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
        <Box className='header-logo'>
          <Link to='/'>ロゴ</Link>
        </Box>
        <Grid container className='header-menu' sx={{ alignItems: 'center' }}>
          <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          </Grid>
          <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Link to='/mypage'>マイページ</Link>
          </Grid>
          <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Link to='/password'>パスワード変更</Link>
          </Grid>
          <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Link to='/logout'>ログアウト</Link>
          </Grid>
        </Grid>
      </header> */}
      <BaseHeader userId={current_user_id} />
      <Box className='app-container'>
        {/* <Box className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
          <ul>
            <Accordion sx={menuAccordionStyle} className="hoge">
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon sx={{ color: '#fff' }} />}
              >
                <Typography>ポートフォリオ</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{
                padding: '0',
                margin: '0',
              }}>
                <Link to='/portfolio/list/'>
                  <Box sx={menuNestedItemStyle}>ポートフォリオ一覧</Box>
                </Link>
                <Link to='/portfolio/create/'>
                  <Box sx={menuNestedItemStyle}>ポートフォリオ作成</Box>
                </Link>
              </AccordionDetails>
            </Accordion>
            <Link to='/mypage/edit/'>
              <Box sx={menuItemStyle}>ユーザ基本情報変更</Box>
            </Link>
            <Accordion sx={menuAccordionStyle}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon sx={{ color: '#fff' }} />}
              >
                <Typography>プロジェクト管理</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{
                padding: '0',
                margin: '0',
              }}>
                <Link to='/project/list/'>
                  <Box sx={menuItemStyle}>プロジェクト一覧</Box>
                </Link>
                <Link to='/project/list/'>
                  <Box sx={menuItemStyle}>プロジェクト作成</Box>
                </Link>
              </AccordionDetails>
            </Accordion>
            <Link to='/searchproject/'>
              <Box sx={menuItemStyle}>プロジェクト検索</Box>
            </Link>
            <Link to='/scout/'>
              <Box sx={menuItemStyle}>スカウト管理</Box>
            </Link>
            <Link to='/tips/'>
              <Box sx={menuItemStyle}>開発Tips</Box>
            </Link>
            <Link to='/activity/'>
              <Box sx={menuItemStyle}>活動記録</Box>
            </Link>
          </ul>
        </Box> */}
        <BaseSideMenu />

        <Routes>
          <Route path="/dashboard/" element={<DashBoard />} /> 
          <Route path="/mypage/" element={<MyPage userId={current_user_id} />} />
          <Route path="/mypage/edit_profile/" element={<EditProfile userId={current_user_id} />} />
          <Route path="/tips/list/" element={<TipsList />} />
        </Routes>

        {/* <Container className='page-maincontents'>
          <Container className='dashboard-carousel section-wrapper'>
            <DashBoardCarousel />
          </Container>

          <Box className='section-wrapper'>
            <Grid container className='section-wrapper-header'>
              <Grid className='section-wrapper-title'>参加プロジェクト</Grid>
              <Grid>
                <Link to='/project/list'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
              {filteredProjectList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>
                    {item.category && (
                      <span className="tag_category" style={{ backgroundColor: getCategoryColor(item.category) }}>
                        { getCategoryName(item.category) }
                      </span>
                    )}
                    {item.content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-wrapper-header'>
              <Grid className='section-wrapper-title'>ポートフォリオ</Grid>
              <Grid>
                <Link to='/portfolio/list'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
              {filteredPortfolioList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-wrapper-header'>
              <Grid className='section-wrapper-title'>活動記録</Grid>
              <Grid>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>
                    {item.category && (
                      <span className="tag_category" style={{ backgroundColor: getCategoryColor(item.category) }}>
                        { getCategoryName(item.category) }
                      </span>
                    )}
                    {item.content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

        </Container> */}
      </Box>
    </div>
  );
}

export default BaseApp;