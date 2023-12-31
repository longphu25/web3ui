import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  // Set your base URL
  baseURL: 'https://compile.web3school.fun:21558',
  // baseURL: 'https://runner-algo.web3school.fun/',
  // Disable SSL certificate validation (use with caution)
  // httpsAgent: {
  //   rejectUnauthorized: false,
  // },
})

export default instance
