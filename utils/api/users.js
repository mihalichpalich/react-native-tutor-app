import axios from '../../core/axios';

export default {
  signIn: values => axios.post('/user/sigh_in', values)
};
