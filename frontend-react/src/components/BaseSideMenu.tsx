import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { bgcolor_sidemenu } from '../utils/ColorUtils';

// import { createTheme } from '@mui/material/styles';
import '../BaseApp.scss';

const BaseSideMenu = () => {
  
  const menuAccordionStyle = {
    backgroundColor: bgcolor_sidemenu,
    color: '#fff',
    padding: '.5em',
    borderRadius: '0',
    borderBottom: '1px solid #ccc',
    boxShadow: 'none',
  };

  const menuItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  const menuNestedItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  // const themeAccordion = createTheme({
  //   components: {
  //     MuiAccordion: {
  //       styleOverrides: {
  //         root: {
  //           '&.MuiAccordion-root': {
  //             padding: '0',
  //           },
  //           '&.MuiAccordion-root.Mui-expanded': {
  //             margin: '0px',
  //             borderBottom: 'none',
  //           },
  //         },
  //       },
  //     },
  //     // MuiAccordionSummary: {
  //     //   styleOverrides: {
  //     //     root: {
  //     //       '&.MuiAccordionSummary-root': {
  //     //         margin: '0',
  //     //       },
  //     //     },
  //     //   },
  //     // },
  //     // MuiAccordionDetails: {
  //     //   styleOverrides: {
  //     //     root: {
  //     //       '&.MuiAccordionDetails-root': {
  //     //         padding: '0',
  //     //       },
  //     //     },
  //     //   },
  //     // },
  //   },
  // });
  
  return (
    <Box className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
      <ul>
        {/* <li>
          ポートフォリオ
          <ul>
            <li>ポートフォリオ一覧</li>
            <li>ポートフォリオ作成</li>
          </ul>
        </li> */}
        <Accordion sx={menuAccordionStyle}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: '#fff' }} />}
          >
            <Typography>ポートフォリオ</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
            padding: '0',
            margin: '0',
          }}>
            <Link to='/portfolio/list/'>
              <Box sx={menuNestedItemStyle}>ポートフォリオ一覧</Box>
            </Link>
            <Link to='/portfolio/create/'>
              <Box sx={menuNestedItemStyle}>ポートフォリオ作成</Box>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Link to='/mypage/edit/'>
          <Box sx={menuItemStyle}>ユーザ基本情報変更</Box>
        </Link>
        <Accordion sx={menuAccordionStyle}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ color: '#fff' }} />}
          >
            <Typography>プロジェクト管理</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
            padding: '0',
            margin: '0',
          }}>
            <Link to='/project/list/'>
              <Box sx={menuItemStyle}>プロジェクト一覧</Box>
            </Link>
            <Link to='/project/list/'>
              <Box sx={menuItemStyle}>プロジェクト作成</Box>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Link to='/searchproject/'>
          <Box sx={menuItemStyle}>プロジェクト検索</Box>
        </Link>
        <Link to='/scout/'>
          <Box sx={menuItemStyle}>スカウト管理</Box>
        </Link>
        <Link to='/tips/'>
          <Box sx={menuItemStyle}>開発Tips</Box>
        </Link>
        <Link to='/activity/'>
          <Box sx={menuItemStyle}>活動記録</Box>
        </Link>
      </ul>
    </Box>
  );
}

export default BaseSideMenu;
