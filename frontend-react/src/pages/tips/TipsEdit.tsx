import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { RootState, useAppDispatch } from '../../store';

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// date picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { color_category_project, color_category_portfolio, color_category_activity, color_category_tips } from '../../utils/ColorUtils'

import { useParams } from 'react-router-dom'

// import { fetchTipsDetail } from '../../features/tips/tipsDetailSlice'
import { fetchTipsEdit } from '../../features/tips/tipsEditSlice'

const TipsEdit = () => {

  const tipsDetail = useSelector((state: any) => state.tipsDetailReducer.items);
  const isLoading = useSelector((state: any) => state.tipsDetailReducer.isLoading);
  const dispatch = useAppDispatch();

  const params = useParams();

  console.log("params: ", params);

  useEffect(() => {
    if (params.tips_id) {
      dispatch(fetchTipsEdit({ tips_id: params.tips_id }));
    }
  }, [params]);

  console.log("tipsDetail: ", tipsDetail);

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
        return null;
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
    { name: '編集' },
  ];    

  return (
    <Container className='page-maincontents'>

      <Grid container className='page-title-header'>
        <Grid item className='page-title-item'>
          <Typography variant='h2' className='page-title'>Tips 編集</Typography>
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

          <form method='POST' >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      タイトル
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        value={tipsDetail.title}
                        onChange={(e) => {}}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      Tipsカテゴリー
                    </TableCell>
                    <TableCell align="right">
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Tips Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={tipsDetail.category.id}
                          onChange={(e) => {}}
                          label="Age"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      作成日
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker
                            label="Controlled picker"
                            value={dayjs(tipsDetail.date)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      文面
                    </TableCell>
                    <TableCell align="right">
                      <TextareaAutosize
                        className="CustomTextareaIntrocudtion"
                        aria-label="empty textarea"
                        placeholder="Empty"
                        value={tipsDetail.content}
                        style={{
                          minWidth: '100%',
                        }}
                      />
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>

            <Box className='section-footer'>
              <Button variant="contained" color="primary" type='submit'>
                Tipsを作成する
              </Button>
            </Box>
          </form>
        </Box>

    </Container>
  )
}

export default TipsEdit;