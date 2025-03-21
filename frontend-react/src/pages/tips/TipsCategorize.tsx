import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, useAppDispatch } from '../../store';

import { Box, Container, Typography, Breadcrumbs, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { color_category_project, color_category_portfolio, color_category_activity, color_category_tips } from '../../utils/ColorUtils'

import { fetchTipsCategorizeList } from '../../features/tips/tipsCategorizeSlice'

const TipsCategorize = () => {

  const params = useParams<{ tips_category: string }>();

  const tipsList = useSelector((state: RootState) =>
    Array.isArray(state.tipsCategorizeReducer.items) ? state.tipsCategorizeReducer.items : []
  );
  const isLoading = useSelector((state: RootState) => state.tipsCategorizeReducer.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.tips_category) {
      dispatch(fetchTipsCategorizeList({ tips_category: params.tips_category }));
    }
  }, [params.tips_category]);

  // object keysで表示
  console.log("tipsList: ", tipsList);

  const getCategoryTags = (category_id: number) => {
    switch (category_id) {
      case 1:
        return color_category_project;
      case 2:
        return color_category_portfolio;
      case 3:
        return color_category_activity;
      case 4:
        return color_category_tips;
      default:
        return '#ffffff'; // Default color
    }
  };

  let current_category;
  switch (params.tips_category) {
    case 'project':
      current_category = "プロジェクト";
      break;
    case 'language':
      current_category = "開発言語";
      break;
    case 'framework':
      current_category = "フレームワーク";
      break;
    case 'infra':
      current_category = "インフラ";
      break;
    default:
      current_category = null;
  }
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips', href: '/tips/' },
    { name: current_category },
  ];    

  return (
    <Container className='page-maincontents'>

      <Grid container className='page-title-header'>
        <Grid className='page-title-item'>
          <Typography variant='h2' className='page-title'>開発Tips</Typography>
        </Grid>
        <Grid className='page-title-item'>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((item, index) => (
              item.href && index < breadcrumbs.length - 1 ? (
                <Link key={index} color="inherit" to={item.href}>
                  {item.name}
                </Link>
              ) : (
                <Typography key={index} color="textPrimary">
                  {item.name}
                </Typography>
              )
            ))}
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>{current_category}</Grid>
          <Grid>
          </Grid>
        </Grid>
        
        {tipsList.length !== 0 && !isLoading ? (
          <Box className='section-contents'>
            {tipsList.map((item: any) => (
              <dl key={item.id}>
                <dt>{item.date}</dt>
                <dd>
                  <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category?.id) }}>
                    {item.category.tips_name}
                  </span>
                  <Link to={`/tips/detail/${item.id}`}>{item.title}</Link>
                  <br />
                  {item.content?.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
                </dd>
              </dl>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

    </Container>
  )
}

export default TipsCategorize;
