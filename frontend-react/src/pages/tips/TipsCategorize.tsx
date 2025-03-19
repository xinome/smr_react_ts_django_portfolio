import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { RootState, useAppDispatch } from '../../store';

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { color_category_project, color_category_portfolio, color_category_activity, color_category_tips } from '../../utils/ColorUtils'

// import { fetchTipsList } from '../../features/tips/tipsSlice'
import { fetchTipsCategorizeList } from '../../features/tips/tipsCategorizeSlice'

type TipsCategorizeProps = {
  category_name: string,
}

const TipsCategorize = (props: TipsCategorizeProps) => {

  // const user_id = props.user_id;
  console.log("tips_category_name: ", props.category_name);
  
  const tipsList = useSelector((state: any) => state.tipsCategorizeReducer.items);
  const isLoading = useSelector((state: any) => state.tipsCategorizeReducer.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTipsCategorizeList());
  }, [dispatch]);

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
    { name: props.category_name },
  ];    

  return (
    <Container className='page-maincontents'>

      <Grid container className='page-title-header'>
        <Grid item className='page-title-item'>
          <Typography variant='h2' className='page-title'>開発Tips</Typography>
        </Grid>
        <Grid item className='page-title-item'>
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
          <Grid item className='section-title'>{props.category_name}</Grid>
          <Grid item>
          </Grid>
        </Grid>
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
                <Link to={`/tips/language/${item.id}`}>{item.title}</Link>
                <br />
                {item.content && item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
              </dd>
            </dl>
          ))}
        </Box>

      </Box>

    </Container>
  )
}

export default TipsCategorize;
