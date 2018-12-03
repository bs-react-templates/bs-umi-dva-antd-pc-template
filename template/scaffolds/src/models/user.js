

export default {
  namespace: 'user',
  state: {
    currentUser:null,
  },

  effects: {
    *getLogin({_},{put,call}){
      let currentUser = {
        name:'我的账号',
      };
      yield put({
              type:'saveCurrentUser',
              payload:{
                  currentUser:currentUser,
              },
          })
    },

  },
  reducers: {
    saveCurrentUser(state, {payload}) {
          return {...state, ...payload};
    },
  },
};
