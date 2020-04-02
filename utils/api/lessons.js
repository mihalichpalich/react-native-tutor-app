import axios from '../../core/axios';

export default {
  get: () => axios.get('/lesson'),
  remove: id => axios.delete('/lesson/' + id),
  add: values => axios.post('/lesson', values),
};
