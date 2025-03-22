import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { AppDispatch } from '../app/store'; // Adjust the path to your store file

import { RootState, useAppDispatch } from '../store';

import { TextField, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';

import '../BaseApp.scss';

import { accountLogin, accountLogout } from '../features/account/authSlice';

const Login = () => {
  // const dispatch: AppDispatch = useDispatch();
  const dispatch = useAppDispatch();

  const [loginAccount, setLoginAccount] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, loginAccount: { email: string; password: string }) => {
    e.preventDefault();
    
    console.log('loginAccount: ', loginAccount);
    dispatch(accountLogin());
  };
  
  return (
    <div className='login-container'>
      <div className='login-contents'>
        <form method='POST' onSubmit={e => handleSubmit(e, loginAccount)}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow >
                  <TableCell component="th" scope="row">
                    メールアドレス
                  </TableCell>
                  <TableCell align="right">
                    <TextField required id="outlined-basic" label="Required" variant="outlined"
                      value={loginAccount.email}
                      onChange={e => setLoginAccount({...loginAccount, email: e.target.value})}
                    />
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row">
                    パスワード
                  </TableCell>
                  <TableCell align="right">
                    <TextField required id="outlined-basic" label="Required" variant="outlined"
                      value={loginAccount.password}
                      onChange={e => setLoginAccount({...loginAccount, password: e.target.value})}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <input type='submit' value='ログイン' />
        </form>
      </div>
    </div>

  );
};

export default Login;
