import axios from 'axios';
import Constants from 'expo-constants';
const { manifest } = Constants;

axios.defaults.baseURL =
  'http://' +
  (typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000`)
    : `api.example.com`);

//axios.defaults.baseURL = 'http://localhost/:3000';

console.log(axios.defaults.baseURL);

export default axios;