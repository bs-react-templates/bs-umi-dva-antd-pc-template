import router from 'umi/router';


export default {
  namespace: 'login',
  state: {
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield 5;
      router.push('/');
    },
    *logout(_, { call, put, select }) {
      yield 5;
      window.location.href='/login';
    },
  },

  reducers: {
  },
}

