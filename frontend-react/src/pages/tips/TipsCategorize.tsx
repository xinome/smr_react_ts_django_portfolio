import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { RootState, useAppDispatch } from '../../store';

import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Typography, Breadcrumbs, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { color_category_project, color_category_portfolio, color_category_activity, color_category_tips } from '../../utils/ColorUtils'

import { fetchTipsCategorizeList } from '../../features/tips/tipsCategorizeSlice'

const TipsCategorize = () => {

  console.log("useParams: ", useParams());
  console.log("tips_category: ", useParams().tips_category);

  const params = useParams<{ tips_category: string }>();
  
  const tipsList = useSelector((state: RootState) => state.tipsCategorizeReducer.items);
  const isLoading = useSelector((state: RootState) => state.tipsCategorizeReducer.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.tips_category) {
      dispatch(fetchTipsCategorizeList({ tips_category: params.tips_category }));
    }
  }, [dispatch, params]);

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
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips', href: '/tips/' },
    { name: params.tips_category },
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
          <Grid className='section-title'>{params.tips_category}</Grid>
          <Grid>
          </Grid>
        </Grid>
        
        {tipsList.length !== 0 && !isLoading ? (
          <Box className='section-contents'>
            {/* <dl>
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
            </dl> */}
            {tipsList.map((item: any) => (
              <dl key={item.id}>
                <dt>{item.date}</dt>
                <dd>
                  <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                    {item.category.tips_name}
                  </span>
                  <Link to={`/tips/${params.tips_category}/${item.id}`}>{item.title}</Link>
                  <br />
                  {item.content && item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
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
