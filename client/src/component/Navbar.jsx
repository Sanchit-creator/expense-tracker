import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { InputBase, alpha } from '@mui/material';
import { toast } from 'react-toastify';


const Tool = styled(Toolbar)`
    background-color: #00B000;
    display: flex;
    justify-content: space-between;
`

const Icons = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
`

const SearchInput = styled(InputBase)`
    background-color: white;
    opacity: 0.5;
    border: 1px solid transparent;
    border-radius: 10px;
    padding-left: 5px;
`

const Shopping = styled(ShoppingBasketIcon)`
  cursor: pointer;
`
const Img = styled(Box)`
  visibility: visible;
  height: 50px;
  width: 50px
`

const Navbar = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const user = localStorage.getItem('user');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Tool>
          <h2>Expense Tracker App</h2>
            { userInfo && <Button color="inherit"
                onClick={() => {
                    localStorage.clear();
                    navigate('/')
                    toast.success('Logged Out')
                }}
            >Logout</Button>}
        </Tool>
      </AppBar>
    </Box>
  )
}

export default Navbar