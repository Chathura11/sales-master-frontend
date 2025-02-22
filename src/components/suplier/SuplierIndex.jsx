import { Route, Routes } from 'react-router-dom';
import { Paper, Stack } from '@mui/material'
import React from 'react'
import MainHeader from '../main/MainHeader'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SuplierForm from './SuplierForm';
import SuplierList from './SuplierList';

const SuplierIndex = ({isLoggedIn,authUser,configure}) => {
    const stackStyle={
        margin:'20px 0',
    }

    const paperStyle={
        padding:'20px',
        background:"#FFFFFF77"
    }
  return (
    <Stack style={stackStyle} spacing={2}>
        <MainHeader tag={'Supliers'} icon={<AccountBoxOutlinedIcon  sx={{width: 40, height: 40}}/>}/>  
        <Paper style={paperStyle} elevation={0}>
            {isLoggedIn&&authUser&&
                <Routes>
                    <Route path='/' element={<SuplierList authUser={authUser} configure={configure}/>}></Route>
                    <Route path='/suplier/edit/:suplierId' element={<SuplierForm edit={true}/>}></Route>
                </Routes>
            }
        </Paper> 
    </Stack>
  )
}

export default SuplierIndex