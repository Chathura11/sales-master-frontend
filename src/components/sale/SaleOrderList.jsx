import { Divider, Paper, Stack, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'

const SaleOrderList = ({orderedProducts,totalPrice,totalQnty}) => {
  return (
    <Paper elevation={0} sx={{padding:2,width:'30%'}}>
      <Stack>
        <Typography component="span" variant="body2" sx={{ color: 'text.primary',display:'flex',height:40,justifyItems:'center',justifyContent:'center',alignItems:'center',background:teal[500]}}>
          Orderd List
        </Typography>

        <Stack  direction='row' spacing={1} sx={{background:'black',height:30,display:'flex',alignItems:'center'}}>
          <Typography width='50%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' }}>
            Product
          </Typography>
          <Typography width='10%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' ,textAlign:'center'}}>
            Qnty
          </Typography>
          <Typography width='10%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' ,textAlign:'center'}}>
            %
          </Typography>
          <Typography width='20%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' ,textAlign:'center'}}>
            Price
          </Typography>
          <Typography width='20%' component="span" variant="body2" sx={{ color: 'white', display: 'inline',textAlign:'center' }}>
            Total
          </Typography>
        </Stack>
        <Divider />
      </Stack>

      {orderedProducts&&orderedProducts.map((product,index)=>{
        return(
          <Stack key={index} sx={{height:30}}>
            <Stack  direction='row' spacing={1}>
              <Typography width='50%' component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' }}>
                {product.name}
              </Typography>
              <Typography width='10%' component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' ,textAlign:'center'}}>
                {product.quantity}
              </Typography>
              <Typography width='10%' component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline',textAlign:'center'}}>
                {product.discount}
              </Typography>
              <Typography width='20%' component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' ,textAlign:'right'}}>
                {product.price}
              </Typography>
              <Typography width='20%' component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' ,textAlign:'right'}}>
                {product.quantityPrice}
              </Typography>
            </Stack>
            <Divider />
          </Stack>            
        )
      })} 

      <Stack>
        <Stack  direction='row' spacing={1} sx={{background:'black',height:30,display:'flex',alignItems:'center'}}>
          <Typography width='50%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' }}>
            Total
          </Typography>
          <Typography width='10%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' ,textAlign:'center'}}>
            {totalQnty}
          </Typography>
          <Typography width='10%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' ,textAlign:'center'}}>
            
          </Typography>
          <Typography width='20%' component="span" variant="body2" sx={{ color: 'white', display: 'inline' ,textAlign:'center'}}>
            
          </Typography>
          <Typography width='20%' component="span" variant="body2" sx={{ color: 'white', display: 'inline',textAlign:'right' }}>
            {totalPrice}
          </Typography>
        </Stack>
        <Divider />
      </Stack>

    </Paper>
  )
}

export default SaleOrderList