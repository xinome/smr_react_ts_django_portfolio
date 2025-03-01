import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import './BaseApp.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { bgcolor_header, bgcolor_sidemenu } from './utils/ColorUtils';

// コンポーネント
import DashBoardCarousel from './components/DashBoardCarousel';

const BaseApp = () => {

  // const isLoggedIn = false;

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

  // useEffect(() => {
  //   fetch('./data/project.json')
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(jsondata => console.log(jsondata));
  // }, [projectList]);

  // useEffect(() => {
  //   fetch('./data/project.json', {
  //     headers : {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     console.log(response);
  //     return response.json();
  //   })
  //   .then(jsondata => {
  //     console.log(jsondata);
  //     setProjectList(jsondata);
  //   });
  // }, [projectList]);

  useEffect(() => {
    const json = require('./data/project.json');
    // requireではなくfetch
    setProjectList(json);
  }, [projectList]);

  useEffect(() => {
    const json = require('./data/portfolio.json');
    setPortfolioList(json);
  }, [portfolioList]);

  useEffect(() => {
    const json = require('./data/activity.json');
    setActivityList(json);
  }, [activityList]);

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
      <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
        <div className='header-logo'>
          <Link to='/'>ロゴ</Link>
        </div>
        <div className='header-menu'>
          <div className='header-menu-item'>
            {/* アカウント画像アイコン */}
            アカウントID
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
          <div className='dashboard-carousel section-wrapper'>
            {/* カルーセル */}
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
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
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
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ1」html / css / wordpress</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ2」php / laravel / docker</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ3」vue.js / vuetify / node.js / bootstrap</dd>
              </dl>
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
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名1」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>[ポートフォリオ]「ポートフォリオ名2」いいねがつきました。</dd>
              </dl>
              <dl>
                <dt>2022.10.11</dt>
                <dd>[スカウト]「社名3」からメッセージが届きました。</dd>
              </dl>
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