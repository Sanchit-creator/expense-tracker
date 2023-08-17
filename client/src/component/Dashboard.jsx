import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getProducts, postProduct } from '../services/api';
import { useMediaQuery } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';


const MainBox = styled(Box)`
    background-color: #F0FFF0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-x: hidden;
`

const Upload = styled(Box)`
    background-color: #fff;
    height: 100px;
    width: 80vw;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: #D1FFBD;
    }
`

const InputBox = styled(Box)`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`

const Main = styled(Box)`
    height: 100px;
    display: flex;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 10px;
    background-color: #fbfbfb;
    &:hover {
        background-color: #fff;
    }
`

const BtnSec = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-right: 50px;
`

const Thumbnail = styled(Box)`
    height: 80px;
    width: 150px;
`

const NormalBox = styled(Box)`
    width: 20vw;
    overflow: hidden;
`

const initialValues = {
    exp_name: '',
    amount: '',
    date: '',
    des: '',
    category: '',
}

const DashBoard = () => {
    const [open, setOpen] = React.useState(false);
    const [submit, setSubmit] = useState(initialValues);
    const [response, setResponse] = useState();
    const [chartData, setChartData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // New state for selected category
    const isMobile = useMediaQuery('(max-width: 600px)');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const {params} = useParams()
    useEffect(() => {
        const random = () => getProducts(params).then(function(result) {
            console.log(result.data);
            setResponse(result.data);
            setChartData(prepareChartData(result.data));
        })
        random();
    }, [])

    const onInputChange = (e) => {
        setSubmit({ ...submit, [e.target.name]: e.target.value });
    }

    const uploadProducts = async () => {
        try {
            let res = await postProduct(submit, params);
            setOpen(false);
            setResponse(res.data)
            console.log(res.data);
            toast.success('Posted')
        } catch (error) {
            console.log(error);
            toast.error('Not Posted!')
        }
    }

    const prepareChartData = (data) => {
        const categories = ['Groceries', 'Utilities', 'Entertainment'];
        const categoryAmounts = {};
    
        categories.forEach((category) => {
            categoryAmounts[category] = 0;
        });
    
        data.forEach((expense) => {
            categoryAmounts[expense.category] += parseFloat(expense.amount);
        });
    
        const chartData = categories.map((category) => ({
            category,
            amount: categoryAmounts[category],
        }));
    
        return chartData;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    const navigate = useNavigate();
    const clickToDetails = (e) => {
        navigate(`/details/${e._id}`)
    }

    if (typeof response === 'undefined') {
        return (
            <h1>
                Loading...
            </h1>
        )
    }
    
    const totalAmount = response.reduce((total, data) => total + parseFloat(data.amount), 0);
    
    const deleteP = async (e) => {
        try {
            let result = await deleteUser({params, e});
            setResponse(result.data)
            toast.success('Deleted!')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainBox>
            <Upload>
                <AddCircleOutlineIcon fontSize='large' onClick={handleClickOpen} style={{ color: "#00B000", cursor:"pointer" }}/>
                <Typography style={{ color: "#00B000" }}>Upload A Product</Typography>
                <Dialog open={open} onClose={handleClose}>
                    <Box component="form" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                        <DialogTitle>Fill the product's information</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                required
                                id="name"
                                label="Expense Name"
                                name='exp_name'
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                required
                                label="Amount of Expense in Rs"
                                name='amount'
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                required
                                label="Date"
                                name='date'
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Description"
                                name='des'
                                type="text"
                                fullWidth
                                required
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormControl fullWidth variant="standard" margin="dense">
                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select
                                    autoFocus
                                    label="Category"
                                    id="category"
                                    name="category"
                                    required
                                    value={submit.category}
                                    onChange={(e) => onInputChange(e)}
                                >
                                    <MenuItem value="Groceries">Groceries</MenuItem>
                                    <MenuItem value="Utilities">Utilities</MenuItem>
                                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => uploadProducts()}>Submit</Button>
                            <ToastContainer />
                        </DialogActions>
                    </Box>
                </Dialog>
            </Upload>
            <FormControl style={{"width": "40vw"}} fullWidth variant="standard" margin="dense">
                <InputLabel htmlFor="filterCategory">Filter by Category</InputLabel>
                <Select
                    autoFocus
                    label="Filter by Category"
                    id="filterCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <MenuItem value="All">All Categories</MenuItem>
                    <MenuItem value="Groceries">Groceries</MenuItem>
                    <MenuItem value="Utilities">Utilities</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                </Select>
            </FormControl>
            <Box style={{"width": "80vw", "padding-left": "10vw", "overflow-x": "hidden"}}>
            <ResponsiveContainer width="80%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#00B000" name="Expense Amount" />
                </BarChart>
            </ResponsiveContainer>
            </Box>
            {
                response ? response
                    .filter(data => selectedCategory === 'All' || data.category === selectedCategory)
                    .map((data, key) => (
                        <Main key={data._id}>
                            <InputBox>
                                <NormalBox>
                                    <Typography>Name: {data.exp_name}</Typography>
                                </NormalBox>
                                <NormalBox>
                                    <Typography>Amount: Rs. {data.amount}</Typography>
                                </NormalBox>
                                {!isMobile && <NormalBox>
                                    <Typography>Date: {data.date}</Typography>    
                                </NormalBox>}
                            </InputBox>
                            <BtnSec>
                                <Button onClick={() => clickToDetails(data)}>Edit</Button>
                                <Button onClick={() => deleteP(data)}>Delete</Button>
                            </BtnSec>
                        </Main>
                    ))
                : 'Loading...'
            }
            <h2>Total Amount: Rs. {totalAmount.toFixed(2)}</h2>
        </MainBox>
    )
}

export default DashBoard;
