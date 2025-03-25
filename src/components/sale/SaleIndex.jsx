import { Stack } from '@mui/material'
import React from 'react'
import SaleHeader from './SaleHeader'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Route, Routes } from 'react-router-dom';
import SaleContent from './SaleContent';

const SaleIndex = ({isLoggedIn,authUser}) => {

    const stackStyle={
        margin:'20px 0',
    }

  return (
    <Stack style={stackStyle} spacing={2}>
        <SaleHeader tag={'Sales'} icon={<ListAltOutlinedIcon  sx={{width: 40, height: 40}}/>}/>  
            {isLoggedIn&&authUser&&
                <Routes>
                    <Route path='/' element={<SaleContent authUser={authUser}/>}></Route>
                </Routes>
            }
    </Stack>
  )
}

export default SaleIndex