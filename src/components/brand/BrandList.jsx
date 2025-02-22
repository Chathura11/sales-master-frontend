import { Box, Button, Paper, Stack,Grid, Card, CardMedia, CardContent, Typography, LinearProgress, CardHeader, IconButton, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSidePanel } from '../../context/SidePanelContext';
import BrandForm from './BrandForm';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import brandImage from './img/1.jpeg'
import NoDataPage from './../common/NoDataPage'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/api';
import { green, orange } from '@mui/material/colors';

const BrandList = ({configure}) => {
    const {openSidePanel} = useSidePanel()
    const [isLoading, setIsLoading] = useState(true); 
    const handleClickBrandFormOpen = () => {
        openSidePanel("ADD NEW BRAND",<BrandForm/>)
    };
    const navigate = useNavigate()

    const handleClickEditBrandFormOpen = (brandId) => {
      navigate('/admin-panel/brand/edit/'+brandId);
    };

    const [brands,setBrands] = useState([])

    useEffect(() => {
      async function load(){
        await axiosInstance.get('brands').then((res)=>{
          setBrands(res.data.data)
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
                ?<Button variant='contained' size='small' onClick={handleClickBrandFormOpen}><AddIcon/>Add New Brand</Button>
                :''
              }
          </Box>
          {
            isLoading?
            <Box sx={{textAlign:'center'}}>
              <LinearProgress color="teal" />
            </Box>
            :brands
            ?
              <Grid container spacing={2}>
              {brands&&brands.map((brand)=>{
                return(
                  <Grid item key={brand._id}>
                    <Card variant='outlined' sx={{width:240}} >
                      <CardHeader
                        action={
                          configure?
                            <IconButton aria-label="settings" color='primary' onClick={()=>handleClickEditBrandFormOpen(brand._id)}>
                              <EditIcon fontSize='small'/>
                            </IconButton>
                          :''
                        }
                        title={brand.name}
                        subheader="products count"
                      />                   
                        <Box sx={{display:'flex',justifyContent:'center'}}> 
                          <CardMedia
                            component="img"
                            sx={{ height: 100, objectFit: 'contain',padding:1}}
                            image={brand.imageURL?brand.imageURL:brandImage}
                          />          
                        </Box>        
                      <CardContent>
                      <Chip  variant='filled' size='small' sx={{color:'white',background: brand.status === 1 ? green[400] : orange[400],width:'100%'}} label={brand.status === 1 ? 'Active' : 'Inactive'} />
                        <Typography variant="body2" color="text.secondary">
                          {brand.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
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

export default BrandList