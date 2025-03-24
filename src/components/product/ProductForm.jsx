import { Box, FormControl, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../api/api';

const ProductForm = ({edit}) => {
  const location = useLocation();
  const [suppliers,setSuppliers] = useState([]);
  const [brands,setBrands] = useState([]);
  const [categories,setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    id:'',
    name:'',
    code:'',
    price:'',
    cost:'',
    discount:'',
    description:'',
    brand:'',
    category:'',
    supplier:'',
    remark:'',
    status:true,
    imageURL:''
  });

  useEffect(() => {
    async function Load(){
      setIsLoading(true);
      await axiosInstance.get('/suppliers').then((res)=>{
        setSuppliers(res.data.data);
      })
      await axiosInstance.get('/categories').then((res)=>{
        setCategories(res.data.data);
      })
      await axiosInstance.get('/brands').then((res)=>{
        setBrands(res.data.data);
      })

      if(edit){
        setData({
          id:location.state.id,
          name:location.state.name,
          code:location.state.code,
          price:location.state.price,
          cost:location.state.cost,
          discount:location.state.discount,
          description:location.state.description,
          brand:location.state.brand?._id?location.state.brand?._id:'',
          category:location.state.category?._id?location.state.category?._id:'',
          supplier:location.state.supplier?._id?location.state.supplier?._id:'',
          remark:location.state.remark,
          status:location.state.status,
          imageURL:location.state.imageURL
        })
  
        
      }
    }
    Load().then(()=>{
      setIsLoading(false);
    })

  }, [edit,location.state])
  
  function submitHandle(){
    console.log("submit")
  }

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSupplierChange = (event) => {
    setData({ ...data, supplier: event.target.value });
  };

  const handleBrandChange = (event) => {
    setData({ ...data, brand: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setData({ ...data, category: event.target.value });
  };

  return (
    <Paper elevation={0} sx={{padding:2}} >
      <Stack spacing={2} sx={{margin:1}}>
        <Box sx={{textAlign:'center'}}>
          {isLoading&&<LinearProgress color="teal" />}
        </Box>
        <form onSubmit={submitHandle}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              value={data.name || ''}
              size='small'
              // required
            />
            <Box sx={{ width: 200 }}>
            <FormControl fullWidth required>
              <InputLabel>Brand</InputLabel>
                <Select
                 value={data.brand}
                 label="brand"
                 onChange={handleBrandChange}
                 size='small'
                >                     
                    {brands&& brands.map((brand)=>{
                      return(
                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                      )
                    })}    
                    
                </Select>
              </FormControl>      
            </Box>
            <Box sx={{ width: 200 }}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
                <Select
                 value={data.category}
                 label="category"
                 onChange={handleCategoryChange}
                 size='small'
                >                     
                    {categories&& categories.map((category)=>{
                      return(
                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                      )
                    })}    
                    
                </Select>
              </FormControl>      
            </Box>
            <Box sx={{ width: 200 }}>
            <FormControl fullWidth required>
              <InputLabel>Supplier</InputLabel>
                <Select
                 value={data.supplier}
                 label="supplier"
                 onChange={handleSupplierChange}
                 size='small'
                >                     
                    {suppliers&& suppliers.map((supplier)=>{
                      return(
                        <MenuItem key={supplier._id} value={supplier._id}>{supplier.name}</MenuItem>
                      )
                    })}    
                    
                </Select>
              </FormControl>      
            </Box>
          </Stack>        
        </form>
      </Stack>
    </Paper>
  )
}

export default ProductForm