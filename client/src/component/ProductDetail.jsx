import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { editProduct, singleProducts } from '../services/api';

const Content = styled(Box)`
    display: flex;
    height: 80vh;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 50vw;
`

const Main = styled(Box)`
    display: flex;
    justify-content: center;
    width: 100vw;
`

const Img = styled(Box)`
    height: 150px;
    width: 250px;
    margin: 10px
`

const ProductDetail = () => {
    const [interviewData, setInterviewData] = useState();
    const [signup, setSignup] = useState({});
    const { paramsone } = useParams();


    
    
    useEffect(() => {
        const random = () => singleProducts(paramsone).then(function(result) {
            console.log(result.data);
            setInterviewData(result.data);
        })

        random();
    }, [])

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async () => {
        try {
          let res = await editProduct({paramsone, signup});
          if (res) {
            setInterviewData(res.data)
            toast.success('Posted!')
          }else{
            toast.error('Error While posting')
          }
        } catch (error) {
          console.log(error);
        }
      }



    if (typeof interviewData === 'undefined') {
        return (
            <h1>Loading...</h1>
        )
    }

  return (
    <Main component="form" noValidate >
        <Content>
          <h1>Edit Expense:-</h1>
        <TextField
          required
          id="outlined-disabled"
          label="Name"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.exp_name}
          name='exp_name'
        /> 
        <TextField
          required
          id="outlined-disabled"
          label="Amount"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.amount}
          name='amount'
        /> 
        <TextField
          required
          id="outlined-disabled"
          label="Description"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.des}
          name='des'
        /> 
        <TextField
          required
          id="outlined-disabled"
          label="Date"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.date}
          name='date'
        /> 
        <TextField
          required
          id="outlined-disabled"
          label="Category"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.category}
          name='date'
        /> 
         <Grid item xs={12} sm={6}>
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => signupUser()}
                >
                    Save
            </Button> 
        </Grid>
    </Content>
    </Main>
  )
}

export default ProductDetail