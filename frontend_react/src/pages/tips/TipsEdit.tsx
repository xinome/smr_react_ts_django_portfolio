import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom'

import { RootState, useAppDispatch } from '../../store';

import { Box, Container, Typography, Breadcrumbs, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

// date picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { fetchGetTipsDetail } from '../../features/tips/tipsDetailSlice'
import { fetchUpdateTips } from '../../features/tips/tipsEditSlice'
import { fetchCategoryList } from '../../features/tips/tipsCategoryListSlice'

type categoryType = { id: number; tips_name: string; tips_path: string };

const TipsEdit = () => {

  const currentTipsDetail = useSelector((state: any) => state.tipsDetailReducer.items);
  const isLoading = useSelector((state: any) => state.tipsDetailReducer.isLoading);
  const categoryList = useSelector((state: any) => state.tipsCategoryListReducer.items);

  const tipsEditState = useSelector((state: any) => state.tipsEditReducer);

  const dispatch = useAppDispatch();

  const params = useParams();

  const [tipsState, setTipsState] = useState(currentTipsDetail || {});
  const [snackOpen, setSnackOpen] = useState(false);

  // カテゴリーリストとTips詳細を取得
  useEffect(() => {
    if (params.tips_id) {
      dispatch(fetchGetTipsDetail({ tips_id: params.tips_id }));
    }
    dispatch(fetchCategoryList());
  }, [params]);

  useEffect(() => {
    if (currentTipsDetail) {
      console.log("currentTipsDetail: ", currentTipsDetail);
      setTipsState(currentTipsDetail);
    }
  }, [currentTipsDetail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, tipsState: any) => {
    e.preventDefault();

    if(currentTipsDetail !== tipsState) {
      dispatch(fetchUpdateTips(tipsState));
      if(tipsEditState.status === 'success') {
        setSnackOpen(true);
      }
    }
  }

  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips', href: '/tips/' },
    { name: '編集' },
  ];

  return (
    <Container className='page-maincontents'>

      <Grid container className='page-title-header'>
        <Grid className='page-title-item'>
          <Typography variant='h2' className='page-title'>Tips 編集</Typography>
        </Grid>
        <Grid className='page-title-item'>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((item, index) => (
              index < breadcrumbs.length - 1 ? (
                <Link key={index} color="inherit" to={item.href || '#'}>
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

      { isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
      ) : (
        <Box className='section-wrapper'>

          <form method='POST' onSubmit={e => {handleSubmit(e, tipsState)}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      タイトル
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        sx={{ minWidth: '100%' }}
                        value={tipsState.title}
                        onChange={e => setTipsState({...tipsState, title: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      Tipsカテゴリー
                    </TableCell>
                    <TableCell align="right">
                      <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Tips Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={tipsState.category?.id || ''}
                          onChange={e => {
                            e.preventDefault();
                            setTipsState({
                              ...tipsState,
                              category: {
                                id: e.target.value,
                                tips_name: categoryList[e.target.value - 1] ? categoryList[e.target.value - 1].tips_name : '',
                                tips_path: categoryList[e.target.value - 1] ? categoryList[e.target.value - 1].tips_path : '',
                              }
                            });
                          }}
                          label="Category"
                        >
                          <MenuItem value="0">
                            <em>None</em>
                          </MenuItem>
                          {categoryList.map((category: categoryType, index: number) => (
                            <MenuItem key={index} value={category.id}>{category.tips_name}</MenuItem>
                          ))}
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
                            label="date"
                            sx={{ minWidth: '100%' }}
                            value={dayjs(tipsState.date)}
                            onChange={(newValue) => {
                              setTipsState({...tipsState, date: dayjs(newValue).format('YYYY-MM-DD')})
                            }}
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
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        minRows={4}
                        sx={{ minWidth: '100%' }}
                        value={tipsState.content}
                        onChange={e => setTipsState({...tipsState, content: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>

            <Box className='section-footer'>
              <Button variant="contained" color="primary" type='submit'>
                Tipsを更新する
              </Button>
            </Box>
          </form>
        </Box>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" variant='filled' sx={{ width: '100%' }}>
          Tipsを更新しました
        </Alert>
      </Snackbar>

    </Container>
  )
}

export default TipsEdit;