
import axios from 'axios'
const URL = 'http://localhost:3000';
    

export const signUpUser = async(data) => {
    try {
        return await axios.post(`${URL}/api/user/register-user`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const signIn = async(data) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/user/login`, data, config)
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}


export const postProduct = async (data, params) => {
    console.log(data);
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        }
        return await axios.post(`${URL}/api/user/upload/${params}`, data, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getProducts = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/products/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const singleProducts = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/single/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}


export const deleteUser = async ({params, e}) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.post(`${URL}/api/user/delete/${params}`, e, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}