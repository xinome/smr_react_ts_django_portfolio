import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { bgcolor_sidemenu } from '../utils/ColorUtils';

import '../BaseApp.scss';

// Material UI(MUI) components
import { List, ListItemText, ListItemButton, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const BaseSideMenu = () => {
  
  // const menuAccordionStyle = {
  //   backgroundColor: bgcolor_sidemenu,
  //   color: '#fff',
  //   padding: '.5em',
  //   borderRadius: '0',
  //   borderBottom: '1px solid #ccc',
  //   boxShadow: 'none',
  // };

  const menuItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  type accordionType = {
    "portfolio": boolean,
    "project": boolean,
    "tips": boolean,
    [key: string]: boolean; // Add index signature
  };

  const [isOpenAccordion, setIsOpenAccordion] = useState<accordionType>(
    {
      "portfolio": false,
      "project": false,
      "tips": false,
    }
  );

  const toggleAccordionMenu = (key: string) => {
    setIsOpenAccordion({ ...isOpenAccordion, [key]: !isOpenAccordion[key] });
  };
  
  return (
    <Box className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
      <List>
        <ListItemButton sx={menuItemStyle}
          onClick={() => toggleAccordionMenu("portfolio")}
        >
          {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
          <ListItemText primary="ポートフォリオ管理" />
          {isOpenAccordion["portfolio"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpenAccordion["portfolio"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='/portfolio/list/'>
              <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                <ListItemText primary="ポートフォリオ一覧" />
              </ListItemButton>
            </Link>
            <Link to='/portfolio/create/'>
              <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                <ListItemText primary="ポートフォリオ作成" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link to='/mypage/edit/'>
          <ListItemButton sx={menuItemStyle}>ユーザ基本情報変更</ListItemButton>
        </Link>

        <ListItemButton sx={menuItemStyle}
          onClick={() => toggleAccordionMenu("project")}
        >
          <ListItemText primary="プロジェクト管理" />
          {isOpenAccordion["project"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpenAccordion["project"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='/project/list/'>
              <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                <ListItemText primary="プロジェクト一覧" />
              </ListItemButton>
            </Link>
            <Link to='/project/create/'>
              <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                <ListItemText primary="プロジェクト作成" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link to='/searchproject/'>
          <ListItemButton sx={menuItemStyle}>プロジェクト検索</ListItemButton>
        </Link>
        <Link to='/scout/'>
          <ListItemButton sx={menuItemStyle}>スカウト管理</ListItemButton>
        </Link>
        <ListItemButton sx={menuItemStyle}
          onClick={() => toggleAccordionMenu("tips")}
        >
          <ListItemText primary="開発tips" />
          {isOpenAccordion["tips"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpenAccordion["tips"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='/tips/'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="開発tips一覧" />
              </ListItemButton>
            </Link>
            <Link to='/tips/create/'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="開発tips作成" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link to='/activity/'>
          <ListItemButton sx={menuItemStyle}>活動記録</ListItemButton>
        </Link>
      </List>
    </Box>
  );
}

export default BaseSideMenu;
