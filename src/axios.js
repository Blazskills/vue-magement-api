import axios from "axios";


const  getApi = axios.create({
    baseURL: 'https://contactmgt-app.herokuapp.com/',
    timeout: 10000
})


// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export { getApi }