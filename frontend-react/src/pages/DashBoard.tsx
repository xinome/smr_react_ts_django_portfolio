import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useAppDispatch } from '../store/index';
import { RootState } from '../store/index';

import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'

import DashBoardCarousel from '../components/DashBoardCarousel'
import { color_category_project, color_category_portfolio, color_category_activity } from '../utils/ColorUtils'

import { fetchProjectTopics } from '../features/topics/projectTopicsSlice'
import { fetchPortfolioTopics } from '../features/topics/portfolioTopicsSlice'
import { fetchActivityTopics } from '../features/topics/activityTopicsSlice'

const DashBoard = () => {

  const dispatch = useAppDispatch();

  // state, dispatch, useSelectorを使う
  const projectList = useSelector((state: RootState) => state.projectTopicsReducer.items);
  const portfolioList = useSelector((state: RootState) => state.portfolioTopicsReducer.items);
  const activityList = useSelector((state: RootState) => state.activityTopicsReducer.items);

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
  
  useEffect(() => {
    dispatch(fetchProjectTopics());
    dispatch(fetchPortfolioTopics());
    dispatch(fetchActivityTopics());
  }, [dispatch]);

  const filteredProjectList: ProjectType = projectList.filter((item: any) => {
    return item.id <= 3;
  });
  const filteredPortfolioList: PortfolioType = portfolioList.filter((item: any) => {
    return item.id <= 3;
  });
  const filteredActivityList: ActivityType = activityList.filter((item: any) => {
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
            <Link to='/project/list/'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
          {filteredProjectList.map((item: any) => (
            <dl key={item.id}>
              <dt>{item.date}</dt>
              <dd>
                {item.category && (
                  <span className="tag_category" style={{ backgroundColor: getCategoryColor(item.category.id) }}>
                    { getCategoryName(item.category.id) }
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
            <Link to='/portfolio/list/'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
          {filteredPortfolioList.map((item: any) => (
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
            <Link to='/activity/'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
          {filteredActivityList.map((item: any) => (
            <dl key={item.id}>
              <dt>{item.date}</dt>
              <dd>
                {item.category && (
                  <span className="tag_category" style={{ backgroundColor: getCategoryColor(item.category.id) }}>
                    { getCategoryName(item.category.id) }
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