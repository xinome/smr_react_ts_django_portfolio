import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, useAppDispatch } from '../store';

import { Box, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { deepPurple } from '@mui/material/colors';

import { bgcolor_header } from '../utils/ColorUtils';

import { fetchAuth, accountLogout } from '../features/account/authSlice';

type BaseHeaderProps = {
  user_id: number;
}

const BaseHeader = (props: BaseHeaderProps) => {

  // const user_id = props.user_id;

  const userAuth = useSelector((state: any) => state.authReducer);
  const usersList = useSelector((state: any) => state.authReducer.items);
  const isLoggedIn = useSelector((state: any) => state.authReducer.isLoggedIn);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // JSONデータを取得する
  // const [usersList, setUsersList] = useState([]);

  // useEffect(() => {
  //   const fetchUsersList = async (id) => {
  //     try {
  //       const response = await Axios.get(`${BASE_API_URL}/users/${id}`);
  //       console.log("fetchUsersList: ", response);
  //       setUsersList(response.data);
  //       console.log("fetchUsersList > usersList: ", usersList);

  //     }
  //     catch (error) {
  //       console.log("fetchUsersList: ", error);
  //     }
  //   }

  //   fetchUsersList(user_id);
  // }, [user_id]);

  // 画面表示時にログインユーザー情報を取得
  useEffect(() => {
    console.log("userAuth: ", userAuth);
    console.log("usersList: ", usersList);
  
    // 未ログインなら login に飛ばす
    if (!isLoggedIn && location.pathname !== "/login/") {
      navigate('/login/');
    }
  
    // ログイン済みなら dashboard に飛ばす（トップページ限定）
    if (isLoggedIn && usersList && usersList.length > 0 && location.pathname === "/") {
      navigate('/dashboard/');
    }
  }, [isLoggedIn, usersList, location, navigate]);

  const stringAvater = (name: string) => {
    return {
      sx: {
        bgcolor: deepPurple[500]
      },
      // children: name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : '',
      children: name ? name.slice(0, 1) : '',
    };
  }

  // ログアウト処理、リダイレクト
  const handleLogout = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dispatch(accountLogout());

    // localStorageのユーザー情報も削除
    localStorage.removeItem('user');
    
    navigate('/login/');
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
          <Avatar {...stringAvater(usersList.account_id)}></Avatar>
        </Grid>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/mypage/'>マイページ</Link>
        </Grid>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/password/'>パスワード変更</Link>
        </Grid>
        <Grid className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <span onClick={handleLogout}>ログアウト</span>
        </Grid>
      </Grid>
    </header>
  );
}

export default BaseHeader;