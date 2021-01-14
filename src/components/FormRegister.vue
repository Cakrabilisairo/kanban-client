<template>
    <div class="container">
        <form id="form-register" @submit.prevent="register">
            <h1>Register</h1>
            <div class="form-group mb-3">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" >
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group mb-3">
                <label for="exampleInputPassword1">Username</label>
                <input type="text" class="form-control" placeholder="Username" v-model="username">
            </div>
            <div class="form-group mb-3">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="password">
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Submit</button>
                <div id="to-logIn"><a  href="" style="color: blue;" @click.prevent="loginForm">Already have an account?</a></div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "RegisterForm",
    data(){
        return {
            email: '',
            username: '',
            password: '',
            server:'http://localhost:3000'
        }
    },
    methods:{
        loginForm(){
            this.$emit("checkAuth")
        },
        register(){
            axios({
                method: "POST",
                url: `${this.server}/register`,
                data:{
                    email: this.email,
                    username: this.username,
                    password: this.password
                }
            })
            .then(respose=>{
                this.$emit("checkAuth")
                this.username = ''
                this.password = ''
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>