import axios from "axios";


const  getApi = axios.create({
    baseURL: 'https://contactmgt-app.herokuapp.com/',
    //  baseURL: 'http://127.0.0.1:4000/',
    timeout: 10000
})


// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export { getApi }