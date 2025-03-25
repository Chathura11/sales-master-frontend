import { Alert, AlertTitle, Box, Button, FormControl, FormControlLabel, Input, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProductForm = ({edit}) => {
  const location = useLocation();
  const [suppliers,setSuppliers] = useState([]);
  const [brands,setBrands] = useState([]);
  const [categories,setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError,setServerError] = useState('')
  const [response,setResponse] = useState('')
  const {productId} = useParams();

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
        const activeSuppliers = res.data.data.filter(item => item.status === true);
        setSuppliers(activeSuppliers);
      })
      await axiosInstance.get('/categories').then((res)=>{
        const activeCategories = res.data.data.filter(item => item.status === true);
        setCategories(activeCategories);
      })
      await axiosInstance.get('/brands').then((res)=>{
        const activeBrands = res.data.data.filter(item => item.status === true);
        setBrands(activeBrands);
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
  
  async function submitHandle(e){
    e.preventDefault();
    setServerError('')
    setResponse('')
    if(edit){
      await axiosInstance.put('/products/'+productId,data).then((res)=>{
        setResponse("Product updated successfully!");
      }).catch((error)=>{
        setServerError(error.response.data.data);
      })
    }else{
      await axiosInstance.post('/products',data).then((res)=>{
        setResponse("Product created successfully! ProductID :"+res.data.data)

        setData({
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
        })
      }).catch((error)=>{
        setServerError(error.response.data.data);
      })
    }
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
            <TextField
              label="Code"
              variant="outlined"
              name="code"
              onChange={handleChange}
              value={data.code || ''}
              size='small'
              // required
            />
            <TextField
              label="Price"
              variant="outlined"
              name="price"
              onChange={handleChange}
              value={data.price || ''}
              size='small'
              // required
            />
            <TextField
              label="Cost"
              variant="outlined"
              name="cost"
              onChange={handleChange}
              value={data.cost || ''}
              size='small'
              // required
            />
            <TextField
              label="Discount"
              variant="outlined"
              name="discount"
              onChange={handleChange}
              value={data.discount || ''}
              size='small'
              // required
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              onChange={handleChange}
              value={data.description || ''}
              size='small'
              // required
            />
            <TextField
              label="Remark"
              variant="outlined"
              name="remark"
              onChange={handleChange}
              value={data.remark || ''}
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
            <FormControlLabel
              sx={{justifyContent:'start'}}
              onChange={(event)=>setData({...data,status:event.target.checked})}
              control={<Switch color="primary" />}
              label="Status"
              labelPlacement="start"
              checked={data.status}
            />
            <Stack direction='row' spacing={2}>
              <TextField size='small' onChange={(e)=>setData({...data,imageURL:e.target.value})} style={{ "width": "100%" }} label="Image" value={data.imageURL ? data.imageURL : ""} helperText={"Select image and press upload"} />
              <label htmlFor="contained-button-file">
                  <Input hidden accept="image/*" id="contained-button-file" type="file" name="file_uploaded" onChange={(e)=>setData({...data,imageURL:e.target.files[0].name})} />
                  <Button variant="outlined" component="span" startIcon={<CloudUploadIcon/>}>
                      SELECT
                  </Button>
              </label>
            </Stack>
            {serverError&&<Alert severity="error">
              <AlertTitle>{serverError}</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>}

            {response&&<Alert severity="success">
                <AlertTitle>{response || ''}</AlertTitle>
            </Alert>}

            <Box sx={{textAlign:'end'}}>
              <Button type="submit" variant="contained">
                {edit?'Save':'Create'}
              </Button>
            </Box>
          </Stack>        
        </form>
      </Stack>
    </Paper>
  )
}

export default ProductForm