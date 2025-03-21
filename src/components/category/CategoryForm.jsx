import { Alert, AlertTitle, Box, Button, FormControlLabel, Input, LinearProgress, Paper, Stack, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';

const CategoryForm = ({edit}) => {
  const [data, setData] = useState({
    name:'',
    description:'',
    imageURL:'',
    status:true,
    remark:''
  });

const [error,setError] = useState('')
const [response,setResponse] = useState('')
const [isLoading, setIsLoading] = useState(false);
const [serverError,setServerError] = useState('')
const {categoryId} = useParams();

const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};

useEffect(() => {
    async function load(){
        if(edit){
            setIsLoading(true)
            await axiosInstance.get('/categories/'+categoryId).then((res)=>{
                setData({
                    name:res.data.data.name,
                    description:res.data.data.description,
                    imageURL:res.data.data.imageURL,
                    status:Boolean(res.data.data.status),
                    remark:res.data.data.remark
                })
            })
            setIsLoading(false)
        }
    }
    try{
        load()
    }catch(e){
        console.log(e.message)
        setIsLoading(false)
    }
 
}, [categoryId,edit])


const submitHandle =(e)=>{
    e.preventDefault()
    setError('')
    setServerError('')
    setResponse('')
    if(edit){
        try{
            axiosInstance.put('/categories/'+categoryId,data).then((res)=>{
                setResponse("Category Updated Successfully!")
            }).catch(e=>{
                setError(e.response.data)
            })
        }catch(e){
            setServerError(e.response.data)
        }
    }else{
        try{
              axiosInstance.post('/categories',data).then((res)=>{
                setResponse(res.data.message)
                setData({
                  name:'',
                  description:'',
                  imageURL:'',
                  status:true,
                  remark:''
                })
            }).catch((e)=>{
                setError(e.response.data.message)
            })
        }catch(e){
            setServerError(e.message)
        }
    }
}
return (
<Paper elevation={0} sx={{padding:2}} >
  <Stack spacing={2} sx={{margin:1}}>
    <Box sx={{textAlign:'center'}}>
      {isLoading&&<LinearProgress color="teal" />}
    </Box>
    <form onSubmit={submitHandle}>
      <Stack spacing={2}>
        <TextField
          error={error.name ? true : false}
          label="Name"
          variant="outlined"
          name="name"
          helperText={error.name || ''}
          onChange={handleChange}
          value={data.name || ''}
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

export default CategoryForm