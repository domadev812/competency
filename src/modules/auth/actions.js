/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '@/store';
import * as types from './mutation-types';
// import authAPI from '../../../api/auth';

export const login = ({ commit }, user) => {
  authAPI.login(user.email, user.password).then((response) => {
    store.dispatch('setLoading', false);
    if (response !== 'false') {
      commit(types.LOGIN, response);
      commit(types.SET_AUTH_RESULT, true);
      Vue.router.push({
        name: store.getters.getRedirectURL(),
      });
    } else {
      commit(types.SET_AUTH_RESULT, false);
    }
  });
};

export const setAuthResult = ({ commit }, result) => {
  commit(types.SET_AUTH_RESULT, result);
};

export default {
  login,
  setAuthResult
};
