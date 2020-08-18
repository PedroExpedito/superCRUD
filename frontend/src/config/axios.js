import axios from 'axios';

const api = axios.create({
  baseURL: 'http://0.tcp.sa.ngrok.io:16144',
});

export default api;

