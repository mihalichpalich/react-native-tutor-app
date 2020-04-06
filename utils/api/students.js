import axios from '../../core/axios';

export default {
  get: () => axios.get('/students'),
  add: values => axios.post('/students', values),
  show: id => axios.get('/students/' + id),
  remove: id => axios.delete('/students/' + id),
  getByPhone: phone => axios.get('/students/getbyphone/' + phone),
  update: (id, values) => axios.patch('/students/' + id, values)
};
