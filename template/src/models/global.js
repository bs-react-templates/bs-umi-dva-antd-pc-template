
export default {
  namespace: 'global',


  state: {
    collapsed:false,
  },

  effects: {



  },

  reducers: {
    save(state, {payload}) {

      return {...state, ...payload};
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },

};
