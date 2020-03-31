import axios from '../../core/axios';

export default {
  get: () => axios.get('/students'),
  add: values => axios.post('/students', values),
};
