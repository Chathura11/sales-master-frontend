import { Alert, AlertTitle, Box, Button, FormControlLabel, Input, LinearProgress, Paper, Stack, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';

const SuplierForm = ({edit}) => {
  const [data, setData] = useState({
    name:'',
    nic:'',
    email:'',
    phone:'',
    address:'',
    payment_term:'',
    credit_limit:'',
    status:true,
    imageURL:''
  });
  
const {suplierId} = useParams();
const [response,setResponse] = useState('')
const [isLoading, setIsLoading] = useState(false);
const [serverError,setServerError] = useState('')

const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });


useEffect(() => {
    async function load(){
        if(edit){
            setIsLoading(true)
            await axiosInstance.get('/api/suplier/'+suplierId+'/edit').then((res)=>{
                setData({
                  name:res.data.suplier.name,
                  nic:res.data.suplier.nic,
                  email:res.data.suplier.contact_email,
                  phone:res.data.suplier.contact_phone,
                  address:res.data.suplier.address,
                  payment_term:res.data.suplier.payment_term,
                  credit_limit:res.data.suplier.credit_limit,
                  status:Boolean(res.data.suplier.status),
                  imageURL:res.data.suplier.imageURL,
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
 
}, [suplierId,edit])


const submitHandle =(e)=>{
    e.preventDefault()
    setServerError('')
    setResponse('')
    if(edit){
        try{
            axiosInstance.put('/supplier/'+suplierId+'/edit',data).then((res)=>{
                setResponse(res.data.message)
            }).catch(e=>{
                setServerError(e.response.data.data)
            })
        }catch(e){
          console.log(e.response)
        }
    }else{
        try{
              axiosInstance.post('/suppliers',data).then((res)=>{
                setResponse(res.data.message)
                setData({
                  name:'',
                  nic:'',
                  email:'',
                  phone:'',
                  address:'',
                  payment_term:'',
                  credit_limit:'',
                  status:true,
                  imageURL:''
                })
            }).catch((e)=>{
                setServerError(e.response.data.data)
            })
        }catch(e){
            console.log(e.response)
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
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              value={data.name || ''}
              size='small'
              // required
            />
            <TextField
              label="NIC"
              variant="outlined"
              name="nic"
              onChange={handleChange}
              value={data.nic || ''}
              size='small'
              // required
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              value={data.email || ''}
              size='small'
              // required
            />
            <TextField
              label="Phone"
              variant="outlined"
              name="phone"
              onChange={handleChange}
              value={data.phone || ''}
              size='small'
              // required
            />
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              onChange={handleChange}
              value={data.address || ''}
              size='small'
              // required
            />
            <TextField
              label="Payment Term"
              variant="outlined"
              name="payment_term"
              onChange={handleChange}
              value={data.payment_term || ''}
              size='small'
              // required
            />
            <TextField
              label="Credit Limit"
              variant="outlined"
              name="credit_limit"
              onChange={handleChange}
              value={data.credit_limit || ''}
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

export default SuplierForm