import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'

import DashBoardCarousel from '../components/DashBoardCarousel'
import { color_category_project, color_category_portfolio, color_category_activity } from '../utils/ColorUtils'

const DashBoard = () => {

  // const isLoggedIn = false;
  const BASE_API_URL = "http://localhost:8000/api";

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
  const [projectList, setProjectList] = useState<ProjectType>([]);
  const [portfolioList, setPortfolioList] = useState<PortfolioType>([]);
  const [activityList, setActivityList] = useState<ActivityType>([]);

  const fetchProjectList = async () => {
    try {
      const response = await Axios.get(`${BASE_API_URL}/project_topics`);
      console.log("fetchProjectList: ", response);
      setProjectList(response.data);
    }
    catch (error) {
      console.log("fetchProjectList: ", error);
    }
  }

  const fetchPortfolioList = async () => {
    try {
      const response = await Axios.get(`${BASE_API_URL}/portfolio_topics`);
      console.log("fetchPortfolioList: ", response);
      setPortfolioList(response.data);
    }
    catch (error) {
      console.log("fetchPortfolioList: ", error);
    }
  }

  const fetchActivityList = async () => {
    try {
      const response = await Axios.get(`${BASE_API_URL}/activity_topics`);
      console.log("fetchActivityList: ", response);
      setActivityList(response.data);
    }
    catch (error) {
      console.log("fetchActivityList: ", error);
    }
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

  const getCategoryColor = (category_id: number) => {
    switch (category_id) {
      case 1:
        return color_category_project;
      case 2:
        return color_category_portfolio;
      case 3:
        return color_category_activity;
      default:
        return "";
    }
  };

  // カテゴリーIDからカテゴリー名を取得する
  const getCategoryName = (category_id: number) => {
    switch (category_id) {
      case 1:
        return "プロジェクト";
      case 2:
        return "ポートフォリオ";
      case 3:
        return "活動記録";
      default:
        return "";
    }
  };

  return (
    <Container className='page-maincontents'>
      {/* カルーセル */}
      <Container className='dashboard-carousel section-wrapper'>
        <DashBoardCarousel />
      </Container>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>参加プロジェクト</Grid>
          <Grid>
            <Link to='/project/list'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
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
        <Grid container className='section-header'>
          <Grid className='section-title'>ポートフォリオ</Grid>
          <Grid>
            <Link to='/portfolio/list'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
          {filteredPortfolioList.map((item) => (
            <dl key={item.id}>
              <dt>{item.date}</dt>
              <dd>{item.content}</dd>
            </dl>
          ))}
        </Box>
      </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>活動記録</Grid>
          <Grid>
            <Link to='/activity'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
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

    </Container>
  )
}

export default DashBoard