import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, useAppDispatch } from '../../store';

import { Box, Container, Typography, Breadcrumbs, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { color_category_project, color_category_portfolio, color_category_activity, color_category_tips } from '../../utils/ColorUtils'

import { useParams } from 'react-router-dom'

import { fetchTipsCategorizeListById } from '../../features/tips/tipsCategorizeSlice'
import { fetchGetTipsDetail } from '../../features/tips/tipsDetailSlice'

const TipsDetail = () => {

  const tipsDetail = useSelector((state: any) => state.tipsDetailReducer.items) ?? [];
  const isLoading = useSelector((state: any) => state.tipsDetailReducer.isLoading);
  const dispatch = useAppDispatch();

  const params = useParams<{ tips_id: string }>();
  const { tips_id } = params;

  console.log("params: ", params);

  useEffect(() => {
    if (tips_id) {
      dispatch(fetchGetTipsDetail({ tips_id: tips_id }));
    }
  }, []);

  useEffect(() => {
    if (params.tips_id) {
      dispatch(fetchTipsCategorizeListById({ tips_id: params.tips_id }));
    }
  }, [params.tips_id]);

  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips', href: '/tips/' },
    { name: params.tips_id },
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

      {tipsDetail.length !== 0 && !isLoading ? (
        <Box className='section-wrapper'>
          <Grid container className='section-header'>
            <Grid className='section-title'>カテゴリー名</Grid>
            <Grid>
              <Button variant='contained' color='primary' href={`/tips/edit/${tipsDetail.id}`}>編集</Button>
            </Grid>
          </Grid>
          <Box className='section-contents'>
            <p>
              {tipsDetail.title}
            </p>
            <p>{`カテゴリー：${tipsDetail.category?.tips_name}`}</p>
            <p>
              {tipsDetail.content}
            </p>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

    </Container>
  )
}

export default TipsDetail