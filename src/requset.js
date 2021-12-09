import axios from 'axios'


const baseUrl = axios.create({
  baseurl: 'http://localhost:8080',
  timeout: 5000,
})

export default baseUrl