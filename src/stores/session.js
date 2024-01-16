import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: {
        email: null,
        picture: null
      },
      loggedIn: false,
      token: null
    }
  },
  actions: {
    login({ user, token }) {
      if (user && token) {
        this.loggedIn = true
        this.user = {
          email: user.email,
          picture: user.picture
        }
        this.token = token
        console.log('user', this.user)
        return true
      }

      return false
    },
    logout() {
      this.loggedIn = false
      this.user = null
      this.token = null
    }

  }
})
