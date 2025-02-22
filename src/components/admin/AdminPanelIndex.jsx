import { BottomNavigation, BottomNavigationAction, Box, Paper, Stack } from '@mui/material'
import React, { useState } from 'react'
import MainHeader from '../main/MainHeader'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import UserIndex from '../user/UserIndex';
import SystemSettingsForm from './SystemSettingsForm';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessDeniedPage from '../common/AccessDeniedPage';
import BrandIndex from '../brand/BrandIndex'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import CategoryIndex from '../category/CategoryIndex';
import { useNavigate } from 'react-router-dom';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ProductIndex from '../product/ProductIndex'
import SuplierIndex from '../suplier/SuplierIndex';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

const AdminPanelIndex = ({isLoggedIn,authUser}) => {
    const navigate = useNavigate()
    const stackStyle={
        margin:'20px 0',
    }

    const paperStyle={
        padding:'20px',
        background:"#FFFFFF77"
    }
    const [value, setValue] = useState(0);
  return (
    <>
    {isLoggedIn&&authUser&&
      <Stack style={stackStyle} spacing={2}>
        <MainHeader tag={'Admin Panel'} icon={<AdminPanelSettingsIcon sx={{width: 40, height: 40}}/>}/>   
        {authUser.permissions.includes("configure_settings") 
        ?
        <Paper style={paperStyle} elevation={0}>
          <Stack>
            <Box sx={{marginBottom:2}}>
              <BottomNavigation
                sx={{borderRadius:1}}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  navigate('/admin-panel')
                }}
                
              >
                <BottomNavigationAction label="Users" icon={<AccountCircleIcon/>}/>
                <BottomNavigationAction label="Brands" icon={<StyleOutlinedIcon/>}/>
                <BottomNavigationAction label="Categories" icon={<TableViewOutlinedIcon/>}/>
                <BottomNavigationAction label="Supliers" icon={<AccountBoxOutlinedIcon/>}/>
                <BottomNavigationAction label="Products" icon={<ListAltOutlinedIcon/>}/>
                <BottomNavigationAction label="Settings" icon={<SettingsIcon/>}/>
              </BottomNavigation>
            
            </Box>

            {value===0?
              <UserIndex authUser={authUser} isLoggedIn={isLoggedIn}/>
            :
            value===1?
              <BrandIndex authUser={authUser} isLoggedIn={isLoggedIn} configure={true}/>
            :
            value===2?
              <CategoryIndex authUser={authUser} isLoggedIn={isLoggedIn} configure={true}/>
            :
            value===3?
              <SuplierIndex authUser={authUser} isLoggedIn={isLoggedIn} configure={true}/>
            :
            value===4?
              <ProductIndex authUser={authUser} isLoggedIn={isLoggedIn} configure={true}/>
            :
              <SystemSettingsForm/>
            }
          </Stack>
        </Paper>
        :
        <AccessDeniedPage/>
        }
      </Stack>
    }
    </>
  )
}

export default AdminPanelIndex