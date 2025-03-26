import { Paper } from '@mui/material'
import React from 'react'

const SaleOrderList = ({orderedProducts}) => {
  return (
    <Paper elevation={0} sx={{padding:2,width:'30%'}}>
        {orderedProducts&&orderedProducts.map((product,index)=>{
          return(
            <div key={index}>
              {product.name}
            </div>
          )
        })}
    </Paper>
  )
}

export default SaleOrderList