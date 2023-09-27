import axios from 'axios'
const API = import.meta.env.VITE_API_KEY

const api = axios.create({
  baseURL: 'https://62d6e7bd51e6e8f06f15878b.mockapi.io/'

})

export default api