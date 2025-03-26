import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import productImage from '../product/img/product.png'

const SaleProducts = ({products,setOrderedProducts,orderedProducts}) => {
  
  function handleCardClick(data){
    console.log(data);
    setOrderedProducts([...orderedProducts,data])
  }

  return (
    <Paper elevation={0} sx={{padding:2,width:'70%',minHeight:300}}>
        {
          products &&
            <Grid container spacing={2}>
            {products&&products.map((product,index)=>{
              return(
                <Grid item key={index}>
                  <CardActionArea onClick={() => handleCardClick(product)}>
                  <Card variant='outlined' sx={{width:150}} >
                    <CardHeader sx={{height:2,textAlign:'center'}}
                      subheader={product.name}
                    />                   
                      <Box sx={{display:'flex',justifyContent:'center'}}> 
                        <CardMedia
                          component="img"
                          sx={{ height: 50, objectFit: 'contain',padding:1}}
                          image={product.imageURL?product.imageURL:productImage}
                        />          
                      </Box>        
                    <CardContent sx={{height:20}}>
                      <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
                        code:{product.code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
                        Rs.{product.price}
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
  )
}

export default SaleProducts