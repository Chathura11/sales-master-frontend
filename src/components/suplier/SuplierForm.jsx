import { Alert, AlertTitle, Box, Button, FormControlLabel, Input, LinearProgress, Paper, Stack, Switch, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const SuplierForm = ({edit}) => {
  const [data, setData] = useState({
    name:'',
    contact_name:'',
    contact_email:'',
    contact_phone:'',
    address:'',
    city:'',
    province:'',
    zip_code:'',
    country:'',
    tax_id:'',
    payment_term:'',
    credit_limit:'',
    note:'',
    status:true,
    remark:''
  });
  

const [error,setError] = useState('')
const {suplierId} = useParams();
const [response,setResponse] = useState('')
const [isLoading, setIsLoading] = useState(false);
const [serverError,setServerError] = useState('')

const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


useEffect(() => {
    async function load(){
        if(edit){
            setIsLoading(true)
            await axios.get('/api/suplier/'+suplierId+'/edit').then((res)=>{
                setData({
                  name:res.data.suplier.name,
                  contact_name:res.data.suplier.contact_name,
                  contact_email:res.data.suplier.contact_email,
                  contact_phone:res.data.suplier.contact_phone,
                  address:res.data.suplier.address,
                  city:res.data.suplier.city,
                  province:res.data.suplier.province,
                  zip_code:res.data.suplier.zip_code,
                  country:res.data.suplier.country,
                  tax_id:res.data.suplier.tax_id,
                  payment_term:res.data.suplier.payment_term,
                  credit_limit:res.data.suplier.credit_limit,
                  note:res.data.suplier.note,
                  status:Boolean(res.data.suplier.status),
                  remark:res.data.suplier.remark
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
 
}, [suplierId])


const submitHandle =(e)=>{
    e.preventDefault()
    setError('')
    setServerError('')
    setResponse('')
    if(edit){
        try{
            axios.put('/api/suplier/'+suplierId+'/edit',data).then((res)=>{
                setResponse(res.data.message)
            }).catch(e=>{
                setError(e.response.data.message)
                console.log(e.response.data.message)
            })
        }catch(e){
            setServerError(e.message)
        }
    }else{
        try{
            axios.post('/api/supliers',data).then((res)=>{
                setResponse(res.data.message)
                setData({
                  name:'',
                  contact_name:'',
                  contact_email:'',
                  contact_phone:'',
                  address:'',
                  city:'',
                  province:'',
                  zip_code:'',
                  country:'',
                  tax_id:'',
                  payment_term:'',
                  credit_limit:'',
                  note:'',
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
              label="Contact Name"
              variant="outlined"
              name="contact_name"
              onChange={handleChange}
              value={data.contact_name || ''}
              size='small'
              // required
            />
            <TextField
              label="Contact Email"
              variant="outlined"
              name="contact_email"
              onChange={handleChange}
              value={data.contact_email || ''}
              size='small'
              // required
            />
            <TextField
              label="Contact Phone"
              variant="outlined"
              name="contact_phone"
              onChange={handleChange}
              value={data.contact_phone || ''}
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
              label="City"
              variant="outlined"
              name="city"
              onChange={handleChange}
              value={data.city || ''}
              size='small'
              // required
            />
            <TextField
              label="Province"
              variant="outlined"
              name="province"
              onChange={handleChange}
              value={data.province || ''}
              size='small'
              // required
            />
            <TextField
              label="Zip Code"
              variant="outlined"
              name="zip_code"
              onChange={handleChange}
              value={data.zip_code || ''}
              size='small'
              // required
            />
            <TextField
              label="Country"
              variant="outlined"
              name="country"
              onChange={handleChange}
              value={data.country || ''}
              size='small'
              // required
            />
            <TextField
              label="Tax Id"
              variant="outlined"
              name="tax_id"
              onChange={handleChange}
              value={data.tax_id || ''}
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
            <TextField
              label="Note"
              variant="outlined"
              name="note"
              onChange={handleChange}
              value={data.note || ''}
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