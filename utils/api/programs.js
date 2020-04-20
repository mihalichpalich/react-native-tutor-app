import axios from '../../core/axios';

export default {
  add: values => axios.post('/program', values),
  update: (programId, values) => axios.patch('/program/' + programId, values),
  remove: programId => axios.delete('/program/' + programId),
  get: userId => axios.get('/program/' + userId)
};
