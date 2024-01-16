import { api } from '@/services/api.js'

export default {
  register(credentials) {
    return api('/users', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  login(credentials) {
    return api('/login_check', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  // user() {
  //   return api('/users')
  // }
}
