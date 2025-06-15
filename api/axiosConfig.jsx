import axios from 'axios'
const instance = axios.create({
    baseURL : 'https://backend-8d2d.onrender.com/'
})

export default instance;