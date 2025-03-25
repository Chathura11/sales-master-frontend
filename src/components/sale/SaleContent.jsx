import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SaleProducts from './SaleProducts'
import SaleOrderList from './SaleOrderList'
import axiosInstance from '../../api/api'
import categoryImage from '../category/img/1.jpg'

const SaleContent = () => {

    const [isLoading, setIsLoading] = useState(true); 
    const [categories,SetCategories] = useState([])

    useEffect(() => {
        async function load(){
          await axiosInstance.get('categories').then((res)=>{
            const activeCategories = res.data.data.filter(item => item.status === true)
            SetCategories(activeCategories)
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

    function handleCardClick(data){
        console.log(data);
    }

  return (
    <Stack spacing={2}>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center',padding:2 }}>
        {
          isLoading?
          <Box sx={{textAlign:'center'}}>
            <LinearProgress color="teal" />
          </Box>
          :categories &&
            <Grid container spacing={2}>
            {categories&&categories.map((category)=>{
              return(
                <Grid item key={category._id}>
                  <CardActionArea onClick={() => handleCardClick(category)}>
                  <Card variant='outlined' sx={{width:150}} >
                    <CardHeader sx={{height:2,textAlign:'center'}}
                      title={category.name}
                    />                   
                      <Box sx={{display:'flex',justifyContent:'center'}}> 
                        <CardMedia
                          component="img"
                          sx={{ height: 50, objectFit: 'cover',padding:1}}
                          image={category.imageURL?category.imageURL:categoryImage}
                        />          
                      </Box>        
                    <CardContent sx={{height:2}}>
                      <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
                        product count
                      </Typography>
                    </CardContent>
                  </Card>
                  </CardActionArea>
                </Grid>
              )
            })

            }
            </Grid>
          
        }
        </Paper>

        <Stack direction='row' spacing={2}>
            <SaleProducts/>
            <SaleOrderList/>
        </Stack>
    </Stack>
  )
}

export default SaleContent