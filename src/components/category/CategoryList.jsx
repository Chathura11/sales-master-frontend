import { Box, Button, Paper, Stack,Grid, Card, CardMedia, CardContent, Typography, LinearProgress, CardHeader, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSidePanel } from '../../context/SidePanelContext';
import CategoryForm from './CategoryForm';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import categoryImage from './img/1.jpg'
import NoDataPage from './../common/NoDataPage'
import { useNavigate } from 'react-router-dom';

const CategoryList = ({configure}) => {
  const {openSidePanel} = useSidePanel()
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate()

  const handleClickCategoryFormOpen = () => {
      openSidePanel("ADD NEW CATEGORY",<CategoryForm/>)
  };

  const handleClickEditCategoryFormOpen = (categoryId) => {
    navigate('/admin-panel/category/edit/'+categoryId);
  };

  const [categories,SetCategories] = useState([])

  useEffect(() => {
    async function load(){
      await axios.get('api/categories').then((res)=>{
        SetCategories(res.data.categories)
        console.log(res.data.categories)
      }).catch((error)=>{
        console.log(error.response.data.message)
      })

      setIsLoading(false)
    }
    try{
      load()
    }catch(e){
      console.log(e.message)
    }
  }, [])
  
return (
  <Paper elevation={0} sx={{padding:2}}>
      <Stack spacing={2}>
        <Box sx={{textAlign:'end'}}>
            {configure
              ?<Button variant='contained' size='small' onClick={handleClickCategoryFormOpen}><AddIcon/>Add New Category</Button>
              :''
            }
        </Box>
        {
          isLoading?
          <Box sx={{textAlign:'center'}}>
            <LinearProgress color="teal" />
          </Box>
          :categories
          ?
            <Grid container spacing={2}>
            {categories&&categories.map((category)=>{
              return(
                category.status==1
                ?
                <Grid item key={category.id}>
                  <Card variant='outlined' sx={{width:240}} >
                    <CardHeader
                      action={
                        configure?
                          <IconButton aria-label="settings" color='primary' onClick={()=>handleClickEditCategoryFormOpen(category.id)}>
                          <EditIcon fontSize='small'/>
                        </IconButton>
                        :''
                      }
                      title={category.name}
                      subheader="products count"
                    />                   
                      <Box sx={{display:'flex',justifyContent:'center'}}> 
                        <CardMedia
                          component="img"
                          sx={{ height: 100, objectFit: 'contain',padding:1}}
                          image={category.imageURL?category.imageURL:categoryImage}
                        />          
                      </Box>        
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                :''
             
              )
            })

            }
            </Grid>
          :<NoDataPage/>
        }
      </Stack>
    </Paper>
  )
}

export default CategoryList