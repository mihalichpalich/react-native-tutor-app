import axios from '../../core/axios';

export default {
  registration: values => axios.post('/user/registration', values),
  getByPhone: phone => axios.get('/user/getbyphone/' + phone),
  getConfirmCode: id => axios.get('/user/getconfirmcode/' + id),
  confirm: id => axios.get('/user/confirm/' + id),
  login: values => axios.post('/user/login', values, { validateStatus: (status) => status === 404 || 200})
};
