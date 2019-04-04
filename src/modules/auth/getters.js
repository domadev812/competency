/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

const getAuthenticated = state => state.authenticated;
const getAuthResult = state => state.authResult;

export default {
  getAuthenticated,
  getAuthResult,
};
