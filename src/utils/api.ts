import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  // Set your base URL
  baseURL: 'http://178.63.14.81:21558',
  // baseURL: 'https://runner-algo.web3school.fun/',
  // Disable SSL certificate validation (use with caution)
  httpsAgent: {
    rejectUnauthorized: false,
  },
})

export default instance
