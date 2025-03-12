import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Axios from 'axios';

import store from '../store';

import { Box, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { deepPurple } from '@mui/material/colors';

import { bgcolor_header } from '../utils/ColorUtils';

type headerProps = {
  userId: number,
}

const BaseHeader = (props: headerProps) => {
  const [usersList, setUsersList] = useState<any>([]);

  const userId = props.userId;
  console.log("BaseHeader: userId: ", userId);

  // const BASE_API_URL = "http://localhost:8000/api";
  // テスト用: JSONPlaceholderを使用
  const BASE_API_URL = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    const fetchUsersList = async (id: number) => {
      try {
        // const response = await Axios.get(`${BASE_API_URL}/users/${id}`);
        // console.log("fetchUsersList: ", response);
        // setUsersList(response.data);
        // console.log("fetchUsersList: usersList: ", usersList);

        fetch(`${BASE_API_URL}/users/${id}`)
          .then((response) => response.json())
          .then((data) => {
            // store.dispatch({ type: 'FETCH_USERS_LIST', payload: data })
            console.log("store: ", store.getState());
            setUsersList(data);
          });
      }
      catch (error) {
        console.log("fetchUsersList: ", error);
      }
    }

    fetchUsersList(userId);
  }, [userId]);

  const stringAvater = (name: string) => {
    return {
      sx: {
        bgcolor: deepPurple[500]
      },
      children: name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : '',
    };
  }

  return (
    <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
      <Box className='header-logo'>
        <Link to='/'>ロゴ</Link>
      </Box>
      <Grid container className='header-menu' sx={{ alignItems: 'center' }}>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          {/* アカウント画像アイコン */}
          {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar> */}
          <Avatar {...stringAvater(usersList.name)}></Avatar>
        </Grid>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/mypage/'>マイページ</Link>
        </Grid>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/password/'>パスワード変更</Link>
        </Grid>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/logout/'>ログアウト</Link>
        </Grid>
      </Grid>
    </header>
  );
}

export default BaseHeader;