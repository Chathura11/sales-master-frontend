import { Box, Card, CardActionArea, CardContent,CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import productImage from '../product/img/product.png'
import { teal } from '@mui/material/colors';

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
                    <CardContent sx={{height:20}} >
                      <Typography variant="body2" color="text.primary" sx={{textAlign:'center'}}>
                        {product.name}
                      </Typography>
                    </CardContent>                   
                      <Box sx={{display:'flex',justifyContent:'center'}}> 
                        <CardMedia
                          component="img"
                          sx={{ height: 50, objectFit: 'contain',padding:1}}
                          image={product.imageURL?product.imageURL:productImage}
                        />          
                      </Box>        
                    <CardContent sx={{height:40,background:teal[500]}}>
                      <Typography variant="body2" color="white" sx={{textAlign:'center'}}>
                        {product.brand?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
                        code:{product.code}
                      </Typography>
                      <Typography variant="body2" color="white" sx={{textAlign:'center'}}>
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