export const myMixin  = {
  data() {
    return {
      loginShow:false
    }
  },
  methods: {
    loginClick(){
      this.loginShow = true
    },
    closeLogin(){
      this.loginShow = false
    }
  },
  
}
