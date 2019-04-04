/* ============
 * Mutations for the auth module
 * ============
 *
 */

import {
  LOGIN,
  SET_AUTH_RESULT
} from './mutation-types';

export default {
  [LOGIN](state, token) {
    state.authenticated = true;
    localStorage.setItem('id_token', token);
  },

  [SET_AUTH_RESULT](state, result) {
    state.authResult = result;
  }
};
