import { sendPost } from '../../config/api'

const state = {
  authUser: {
    access_token: '' || localStorage.getItem('access_token'),
  }
}

const getters = {
  getUserAccessToken: state => state.authUser.access_token,
}

const actions = {
  signIn ({commit}, payload) {
    return new Promise((resolve, reject) => {
      sendPost('/auth/signin', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
