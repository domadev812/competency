import axios from 'axios'

let baseUrl = 'http://18.225.37.152:8080/api'

let config = {
  protocol: 'http',
  address: '18.225.37.152:8080',
  port: '8080',
  basePath: '/api',
  axiosConfig: {
    baseURL: baseUrl,
    headers: {},
    withCredentials: false,
    crossDomain: true,
  },
  getEndpointUrl () {
    return this.protocol + '://' + this.address /* + (this.port ? (':' + this.port) : '') */ + (this.basePath ? this.basePath : '')
  }
}

if (localStorage.getItem('access_token')) {
  config.axiosConfig.headers['authorization'] = 'Bearer ' + localStorage.getItem('access_token')
}

let $http = axios.create(config.axiosConfig)

if (localStorage.getItem('access_token')) {
  $http.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('access_token')
}

let sendPost = (url, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    $http.post(url,payload, headers)
      .then((handleSuccess) => {
        if (handleSuccess.status === 200) {
          resolve(handleSuccess.data)
        }
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

export default config

export { config }

export { sendPost }