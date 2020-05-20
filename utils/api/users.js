import axios from '../../core/axios';

export default {
  signIn: values => axios.post(
      '/user/sign_in', values,
      { validateStatus: (status) => status === 500 || 201}),
  getByEmail: email => axios.get('/user/getbyemail/' + email)
};
