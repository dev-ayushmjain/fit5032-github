import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return { isAuthenticated: false, userid: null }
  },
  actions: {
    setUser(userid) {
      this.isAuthenticated = true
      this.userid = userid
    },
    logout(){
      this.isAuthenticated = false
      this.userid = null
    }
  },
})