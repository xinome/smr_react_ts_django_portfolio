import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { AppDispatch } from '../app/store'; // Adjust the path to your store file

import { RootState, useAppDispatch } from '../store';

import { TextField, TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';

import '../BaseApp.scss';

import { accountLogin, accountLogout } from '../features/account/authSlice';

type LoginAccountParams = {
  email: string;
  password: string;
};

const Login = () => {
  // const dispatch: AppDispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginAccount, setLoginAccount] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('loginAccount: ', loginAccount);

    // ログイン後の処理もここで制御できる
    dispatch(accountLogin(loginAccount))
      .unwrap()
      .then(() => {
        console.log('ログイン成功');
        navigate('/dashboard/');
      })
      .catch((err) => {
        console.error('ログイン失敗:', err);
      });
  };
  
  return (
    <div className='login-container'>
      <div className='login-contents'>
        <form method='POST' onSubmit={e => handleSubmit(e)}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    メールアドレス
                  </TableCell>
                  <TableCell align="right">
                    <TextField name="email" required id="outlined-basic" label="Required" variant="outlined"
                      value={loginAccount.email}
                      onChange={e => setLoginAccount({...loginAccount, email: e.target.value})}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    パスワード
                  </TableCell>
                  <TableCell align="right">
                    <TextField name="password" required id="outlined-basic" label="Required" variant="outlined"
                      value={loginAccount.password}
                      onChange={e => setLoginAccount({...loginAccount, password: e.target.value})}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            ログイン
          </Button>
        </form>
      </div>
    </div>

  );
};

export default Login;
