import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Grid, Avatar } from '@mui/material';

import { bgcolor_header } from '../utils/ColorUtils';
import { deepPurple } from '@mui/material/colors';


const BaseHeader = () => {
  return (
    <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
      <Box className='header-logo'>
        <Link to='/'>ロゴ</Link>
      </Box>
      <Grid container className='header-menu' sx={{ alignItems: 'center' }}>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          {/* アカウント画像アイコン */}
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/mypage'>マイページ</Link>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/password'>パスワード変更</Link>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/logout'>ログアウト</Link>
        </Grid>
      </Grid>
    </header>
  );
}

export default BaseHeader;