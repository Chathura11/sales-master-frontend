import { Route, Routes } from 'react-router-dom';
import { Paper, Stack } from '@mui/material'
import React from 'react'
import MainHeader from '../main/MainHeader'
import CategoryList from './CategoryList';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import CategoryForm from './CategoryForm';

const CategoryIndex = ({isLoggedIn,authUser,configure}) => {
    const stackStyle={
        margin:'20px 0',
    }

    const paperStyle={
        padding:'20px',
        background:"#FFFFFF77"
    }
  return (
    <Stack style={stackStyle} spacing={2}>
        <MainHeader tag={'Categories'} icon={<TableViewOutlinedIcon  sx={{width: 40, height: 40}}/>}/>  
        <Paper style={paperStyle} elevation={0}>
            {isLoggedIn&&authUser&&
                <Routes>
                    <Route path='/' element={<CategoryList authUser={authUser} configure={configure}/>}></Route>
                    <Route path='/category/edit/:categoryId' element={<CategoryForm edit={true}/>}></Route>
                </Routes>
            }
        </Paper> 
    </Stack>
  )
}

export default CategoryIndex