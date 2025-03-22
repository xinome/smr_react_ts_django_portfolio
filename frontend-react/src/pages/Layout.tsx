import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

// Material UI(MUI) components
import { Avatar, Box, Container, Grid } from '@mui/material';

// レイアウト
import BaseHeader from "../components/BaseHeader";
import BaseSideMenu from "../components/BaseSideMenu";

const Layout = () => {

  const navigate = useNavigate();

  const isLoggedIn = true;
  console.log("isLoggedIn: ", isLoggedIn);
  

  const pathname = useLocation().pathname.replaceAll('/', '');
  console.log("useLocation.pathname: ", pathname);

  // 仮置き: ログインユーザID
  const current_user_id = 1;

  // ログイン状態をチェックして、ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login/');
    }
  }, []);

  return (
    <div className="app">
      <BaseHeader user_id={current_user_id} />
      <Box className='app-container'>
        <BaseSideMenu />

        <Outlet />

      </Box>
    </div>
  );
}

export default Layout;
