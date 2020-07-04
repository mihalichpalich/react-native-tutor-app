import axios from '../../core/axios';

export default {
  get: userId => axios.get('/lesson/' + userId),
  remove: id => axios.delete('/lesson/' + id),
  add: values => axios.post('/lesson', values),
  update: (id, values) => axios.patch('/lesson/' + id, values)
};
