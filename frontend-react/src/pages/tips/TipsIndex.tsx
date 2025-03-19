import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { RootState, useAppDispatch } from '../../store';

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Typography, Breadcrumbs, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { color_category_project, color_category_portfolio, color_category_activity, color_category_tips } from '../../utils/ColorUtils'

// import { fetchMypageAccountList } from '../features/mypage/mypageSlice'
import { fetchTipsList } from '../../features/tips/tipsSlice'

const TipsList = () => {

  // const user_id = props.user_id;
  
  const tipsList = useSelector((state: any) => state.tipsReducer.items);
  const isLoading = useSelector((state: any) => state.tipsReducer.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTipsList());
  }, [dispatch]);

  console.log("tipsList: ", tipsList);

  const filteredProjectTipsList = tipsList.filter((item: any) => {
    return item.category.id === 1;
  });

  const filteredLanguageTipsList = tipsList.filter((item: any) => {
    return item.category.id === 2;
  });

  const filteredFrameworkTipsList = tipsList.filter((item: any) => {
    return item.category.id === 3;
  });

  const filteredInfraTipsList = tipsList.filter((item: any) => {
    return item.category.id === 4;
  });

  console.log("filteredProjectTipsList: ", filteredProjectTipsList);
  console.log("filteredLanguageTipsList: ", filteredLanguageTipsList);
  console.log("filteredFrameworkTipsList: ", filteredFrameworkTipsList);
  console.log("filteredInfraTipsList: ", filteredInfraTipsList);

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
        return undefined;
    }
  };
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips' },
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
            <Grid className='section-title'>プロジェクト進行</Grid>
            <Grid>
              <Link to='/tips/project/'>一覧を見る</Link>
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
            {filteredProjectTipsList.map((item: any) => (
              <dl key={item.id}>
                <dt>{item.date}</dt>
                <dd>
                  <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                    {item.category.tips_name}
                  </span>
                  <Link to={`/tips/project/${item.id}`}>{item.title}</Link>
                  <br />
                  {item.content && item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
                </dd>
              </dl>
            ))}
          </Box>
       </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>開発言語</Grid>
          <Grid>
            <Link to='/tips/language/'>一覧を見る</Link>
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
          {filteredLanguageTipsList.map((item: any) => (
            <dl key={item.id}>
              <dt>{item.date}</dt>
              <dd>
                <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                  {item.category.tips_name}
                </span>
                {item.content}
              </dd>
            </dl>
          ))}
        </Box>
      </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>フレームワーク</Grid>
          <Grid>
            <Link to='/tips/framework/'>一覧を見る</Link>
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
          {filteredFrameworkTipsList.map((item: any) => (
            <dl key={item.id}>
              <dt>{item.date}</dt>
              <dd>
                <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                  {item.category.tips_name}
                </span>
                <Link to={`/tips/framework/${item.id}`}>{item.title}</Link>
                <br />
                {item.content && item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
              </dd>
            </dl>
          ))}
        </Box>
      </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>インフラ</Grid>
          <Grid>
            <Link to='/tips/infra/'>一覧を見る</Link>
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
          {filteredInfraTipsList.map((item: any) => (
            <dl key={item.id}>
              <dt>{item.date}</dt>
              <dd>
                <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                  {item.category.tips_name}
                </span>
                <Link to={`/tips/infra/${item.id}`}>{item.title}</Link>
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

export default TipsList;