import {  Box, Chip, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { blueGrey, lightBlue} from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../common/Loading';
import axiosInstance from '../../api/api';

const UserView = ({authUser,isLoggedIn,profile}) => {
  const [user,setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const {userId} = useParams()
  useEffect(() => {
   
    async function load(){
      setIsLoading(true)
      let url;
      if(profile){
        url = '/users/edit/'+authUser._id
      }else{
        url = '/users/edit/'+userId
      }
      await axiosInstance.get(url).then((res)=>{
        setUser(res.data.data)
        setIsLoading(false)
      }).catch(error=>{
        console.log(error.response);
        setIsLoading(false)
      })
    }try{
      load()
    }catch(error){
      console.log(error.message)
    }

  }, [userId,authUser,profile])

  const paperStyle={
    padding:'20px',
    backgroundColor: '#FFFFFFED',
  }

  const editButtonHandle=()=>{
    if(profile){
      navigate('/user-profile/edit');
    }else{
      navigate('/admin-panel/user/edit/'+userId);
    }
   
  }

  const handlePermission = (user) =>{
    if(isLoggedIn&&authUser){
      if(authUser._id === user._id){
        return false
      }else if(user._id === 1){
        return true
      }else if(authUser.permissions.includes("manage_users")){
        return false
      }else{
        return true
      }
    }else{
      return true
    }
  }

  return (
    
    <>
      {isLoading?
        <Loader/>
        :
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Stack spacing={1} sx={{height:'100%'}}>
            <Paper elevation={0} style={paperStyle} sx={{height:'100%'}}>
              
              <Box sx={{textAlign:'center',padding:2}}>
                <AssignmentIndIcon sx={{fontSize:'200px',color:blueGrey[900]}}/> 
              </Box>
              <Stack spacing={0}>
                <Typography variant='p' sx={{fontSize:'20px',fontFamily:'revert-layer'}}>{user.name}</Typography>
                <Typography variant='p' sx={{fontSize:'15px',color:lightBlue[500]}}>{user.role}</Typography> 
              </Stack>
              <Stack direction='row' spacing={1}>
                <EmailIcon/>
                <Typography variant='p' >{user.email}</Typography>
              </Stack>
            </Paper>
          </Stack>
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={1} sx={{height:'100%'}}>
              <Paper elevation={0} style={paperStyle} sx={{height:'100%'}}>
                  <Stack spacing={0}>
                    <Box sx={{textAlign:'end'}}>
                      <IconButton size="small" aria-label="edit" color='primary' onClick={editButtonHandle} disabled={handlePermission(user)}>
                        <EditIcon fontSize="inherit"/>
                      </IconButton>
                    </Box>
                  </Stack>
                  <Grid container spacing={2} sx={{textAlign:'center'}}>
                    <Grid item xs={12}>
                        <Typography variant='p'>Permissions</Typography>
                        <br/>
                        <Stack spacing={1}>
                        {user.permissions&&user.permissions.map((permission)=>{
                          return(
                            <Chip key={permission}  variant='filled' size='small' sx={{color:'white',background:blueGrey[400],width:'100%'}} label={permission} />
                          )
                        })}
                      </Stack>
                    </Grid>
                  </Grid>
              </Paper>
            </Stack>
          </Grid>
        </Grid>  
      }
    </>
  )
}

export default UserView