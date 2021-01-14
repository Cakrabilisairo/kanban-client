<template>
  <div class="container">
    <form id="form-login" @submit.prevent="login">
        <h1>Log In</h1>
        <div class="form-group mb-3">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" >
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" placeholder="Password" v-model="password" >
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg btn-block">Log In</button>
            <div style="text-align: center;">Or</div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <div id="to-signUp">Don't have account? <a href="" style="color: blue;" @click.prevent="registerForm">Register Here</a> </div>
        </div>
    </form>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name: "LoginForm",
    data(){
      return {
        email: '',
        password: '',
        server:'http://localhost:3000',
      }
    },
    methods:{
       login(){
           axios({
               method: 'POST',
               url:`${this.server}/login`,
               data:{
                   email: this.email,
                   password: this.password
               }
           })
           .then(response=>{
               localStorage.setItem('access_token', response.data.access_token)
               this.$emit("checkAuth")
           })
           .catch(err=>{
               console.log(err)
           })
       },
       registerForm(){
         this.$emit("changePage", "register")
       }
    }
}
</script>

<style>

</style>