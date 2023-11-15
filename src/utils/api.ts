import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  // Set your base URL
  baseURL: 'https://178.63.14.81:21558',
  // Disable SSL certificate validation (use with caution)
  httpsAgent: {
    rejectUnauthorized: false,
  },
})

export default instance
