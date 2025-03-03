import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import Axios from 'axios';

import { Avatar, Box, Container } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

import './BaseApp.scss';
import { bgcolor_header, bgcolor_sidemenu } from './utils/ColorUtils';

// コンポーネント
import DashBoardCarousel from './components/DashBoardCarousel';

const BaseApp = () => {

  // const isLoggedIn = false;

  const BASE_API_URL = "http://localhost:8000/api";

  type ProjectType = {
    id: number,
    date: string,
    content: string
  }[];

  type PortfolioType = {
    id: number,
    date: string,
    content: string
  }[];

  type ActivityType = {
    id: number,
    date: string,
    content: string
  }[];

  // JSONデータを取得する
  const [projectList, setProjectList] = useState<ProjectType>([]);
  const [portfolioList, setPortfolioList] = useState<PortfolioType>([]);
  const [activityList, setActivityList] = useState<ActivityType>([]);

  const fetchProjectList = async () => {
    const response = await Axios.get(`${BASE_API_URL}/project_topics`);
    console.log("response: ", response);
    setProjectList(response.data);
  }

  const fetchPortfolioList = async () => {
    const response = await Axios.get(`${BASE_API_URL}/portfolio_topics`);
    console.log("response: ", response);
    setPortfolioList(response.data);
  }

  const fetchActivityList = async () => {
    const response = await Axios.get(`${BASE_API_URL}/activity_topics`);
    console.log("response: ", response);
    setActivityList(response.data);
  }

  useEffect(() => {
    fetchProjectList();
    fetchPortfolioList();
    fetchActivityList();
  }, []);

  const filteredProjectList: ProjectType = projectList.filter((item) => {
    return item.id <= 3;
  });
  const filteredPortfolioList = portfolioList.filter((item) => {
    return item.id <= 3;
  });
  const filteredActivityList = activityList.filter((item) => {
    return item.id <= 3;
  });
  
  return (
    <div className="app">
      <Box>
        <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
          <div className='header-logo'>
            <Link to='/'>ロゴ</Link>
          </div>
          <div className='header-menu'>
            <div className='header-menu-item'>
              {/* アカウント画像アイコン */}
              <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            </div>
            <div className='header-menu-item'>
              <Link to='/mypage'>マイページ</Link>
            </div>
            <div className='header-menu-item'>
              <Link to='/password'>パスワード変更</Link>
            </div>
            <div className='header-menu-item'>
              <Link to='/logout'>ログアウト</Link>
            </div>
          </div>
        </header>
      </Box>
      <div className='app-container'>
        <div className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
          <ul>
            <li>ポートフォリオ</li>
            <li>ユーザ基本情報変更</li>
            <li>プロジェクト管理</li>
            <li>プロジェクト作成</li>
            <li>プロジェクト検索</li>
            <li>スカウト管理</li>
            <li>開発Tips</li>
            <li>活動記録</li>
          </ul>
        </div>
        <div className='page-maincontents'>
          {/* カルーセル */}
          <div className='dashboard-carousel section-wrapper'>
            <DashBoardCarousel />
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>参加プロジェクト</div>
              <div>
                <Link to='/project'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
              {filteredProjectList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>ポートフォリオ</div>
              <div>
                <Link to='/portfolio'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
              {filteredPortfolioList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>活動記録</div>
              <div>
                <Link to='/activity'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BaseApp;