<template>
  <div class="container">
    <form id="form-login" @submit.prevent="login">
        <h1>Log In</h1>
        <div class="form-group mb-3">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" required>
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" placeholder="Password" v-model="password" required>
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg btn-block">Log In</button>
            <div style="text-align: center;">Or</div>
            <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            <div id="to-signUp">Don't have account? <a href="" style="color: blue;" @click.prevent="registerForm">Register Here</a> </div>
        </div>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import GoogleLogin from 'vue-google-login'
import Swal from 'sweetalert2'
export default {
    name: "LoginForm",
    data(){
      return {
        email: '',
        password: '',
        server:'https://kanban-app-server-h8.herokuapp.com',
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID
        },
        renderParams: {
            width: 300,
            height: 50,
            longtitle: true,
            isbutton: true
        }
      }
    },
    components:{
      GoogleLogin
    },

    methods:{
       login(){
           axios({
               method: 'POST',
               url: "https://kanban-app-server-h8.herokuapp.com/login",
               data:{
                   email: this.email,
                   password: this.password
               }
           })
           .then(response=>{
               localStorage.setItem('access_token', response.data.access_token)
               this.$emit("checkAuth")
               this.succeedAlert()
           })
           .catch(err=>{
               Swal.fire({
                  icon: 'error',
                  title: `${err.response.data.message}`,
                  showConfirmButton: false,
                  timer: 2000
               })
               this.email =''
               this.password = ''
            })
       },
       registerForm(){
         this.$emit("changePage", "register")
       },
       onSuccess(googleUser){
          const id_token = googleUser.getAuthResponse().id_token
          axios({
            method: 'POST',
            url: `${this.server}/login/google`,
            data:{
              id_token
            }
        })
        .then(response=>{
          this.succeedAlert()
          localStorage.setItem("access_token", response.data.access_token)
          this.$emit("checkAuth")
        })
        .catch(err=>{
          Swal.fire({
             icon: 'error',
             title: `${err}`,
             showConfirmButton: false,
             timer: 2000
          })
        })
       },
       onFailure(err){
          Swal.fire({
             icon: 'error',
             title: `${err}`,
             showConfirmButton: false,
             timer: 2000
          })
       },
       succeedAlert(){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          })

          Toast.fire({
            icon: 'success',
            title: 'Log in successfully'
          })
       }
    }
}
</script>

<style>

</style>