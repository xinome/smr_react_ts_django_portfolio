import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store';

import { Box, Container, Typography, Breadcrumbs, Button, Table } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { color_category_project, color_category_portfolio, color_category_activity } from '../utils/ColorUtils'

import { fetchAccountList, getAccountList } from '../features/mypage/mypageSlice'

type MypageProps = {
  userId: number,
}

const Mypage = (props: MypageProps) => {

  const userId = props.userId;
  console.log("Mypage: userId: ", userId);

  const dispatch: AppDispatch = useDispatch();
  const itemsAccount = useSelector((state: any) => state.accountReducer.items);

  // const BASE_API_URL = "http://localhost:8000/api";
  // テスト用: JSONPlaceholderを使用
  // const BASE_API_URL = "https://jsonplaceholder.typicode.com";

  // JSONデータを取得する
  // const [usersList, setUsersList] = useState<any>([]);

  useEffect(() => {
    // const fetchPostsList = async () => {
    //   try {
    //     const response = await Axios.get(`${BASE_API_URL}/posts`);
    //     console.log("fetchPostsList: ", response);
    //     setPostsList(response.data);
    //     console.log("fetchPostsList: postsList: ", postsList);
    //   }
    //   catch (error) {
    //     console.log("fetchPostsList: ", error);
    //   }
    // }

    // fetchPostsList();

    // const fetchUsersList = async (id: number) => {
    //   try {
    //     const response = await Axios.get(`${BASE_API_URL}/users/${id}`);
    //     console.log("fetchUsersList: ", response);
    //     setUsersList(response.data);
    //     console.log("fetchUsersList: usersList: ", usersList);
    //   }
    //   catch (error) {
    //     console.log("fetchUsersList: ", error);
    //   }
    // }

    // fetchUsersList(userId);

    // const itemsAccount = useSelector(getAccountList);

    dispatch(fetchAccountList(userId));

  }, [dispatch, userId]);

  // const usersList = itemsAccount.payload.accountReducer.items;
  console.log("Mypage: itemsAccount: ", itemsAccount);
  const usersList = itemsAccount;
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: 'マイページ' },
  ];    

  return (
    <Container className='page-maincontents'>

      <Box className='page-title-wrapper'>
        <Grid container className='page-title-header'>
          <Grid className='page-title-item'>
            <Typography variant='h2' className='page-title'>マイページ</Typography>
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
      </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>
            契約プラン: XXXXXXXX
          </Grid>
        </Grid>
        <Box className='section-contents'>
          説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。
          説明が入ります。説明が入ります。説明が入ります。説明が入ります。
        </Box>

        <Box className='section-footer'>
          <Button variant="contained" color="primary">プラン変更</Button>
        </Box>
      </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>
            ユーザープロフィール
          </Grid>
        </Grid>

        {/* <Box className='section-contents'>
          説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。
          説明が入ります。説明が入ります。説明が入ります。説明が入ります。
        </Box> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              <TableRow >
                <TableCell component="th" scope="row">
                  ID
                </TableCell>
                <TableCell align="right">{usersList.id}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell component="th" scope="row">
                  氏名
                </TableCell>
                <TableCell align="right">{usersList.name}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell component="th" scope="row">
                  ユーザー名
                </TableCell>
                <TableCell align="right">{usersList.username}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell component="th" scope="row">
                  Email
                </TableCell>
                <TableCell align="right">{usersList.email}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell component="th" scope="row">
                  電話番号
                </TableCell>
                <TableCell align="right">{usersList.phone}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell component="th" scope="row">
                  Webサイト
                </TableCell>
                <TableCell align="right">{usersList.website}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box className='section-footer'>
          <Button variant="contained" color="primary">
            <Link to='/mypage/edit_profile/'>プロフィール変更</Link>
          </Button>
        </Box>
      </Box>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid className='section-title'>
            スキルセット
          </Grid>
        </Grid>
        <Box className='section-contents'>
          説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。
          説明が入ります。説明が入ります。説明が入ります。説明が入ります。
        </Box>
        <Box className='section-footer'>
          <Button variant="contained" color="primary">
            <Link to='/mypage/edit_skill/'>スキルセット変更</Link>
          </Button>
        </Box>
      </Box>

    </Container>
  )
}

export default Mypage
