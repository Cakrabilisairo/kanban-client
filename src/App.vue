<template>
    <div>
        <div v-if="currentPage == 'home'">
            <NavBar 
            @checkAuth="checkAuth"
            @changePage="changePage"
            ></NavBar>

            <Home 
            :listCategory="listCategory"
            :listBackLog="listBackLog"
            :listTodo="listTodo"
            :listDoing="listDoing"
            :listDone="listDone"
            @checkAuth="checkAuth"
            @changePage="changePage"
            @findOne="findOne"
            ></Home>
        </div>

         <div v-if="currentPage == 'login'">
            <FormLogin
            @checkAuth="checkAuth"
            @changePage="changePage"
            ></FormLogin>
        </div>

        <div v-if="currentPage == 'register'">
            <RegisterForm
            @checkAuth="checkAuth"
            ></RegisterForm>
        </div>
        <div v-if="currentPage == 'form-add'">
            <FormAddTask
            @checkAuth="checkAuth"
            ></FormAddTask>
        </div>

         <div v-if="currentPage == 'form-edit-task'">
            <FormEditTask
            :task="task"
            @checkAuth="checkAuth"
            ></FormEditTask>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import FormLogin from "./components/FormLogin"
import FormRegister from "./components/FormRegister"
import FormAddTask from "./components/FormAddTask"
import FormEditTask from "./components/FormEditTask"
export default {
    name: "App",
    data(){
        return{
            currentPage: "register",
            server:'http://localhost:3000',
            listCategory:['Back Log', 'Todo', 'Doing', 'Done'],
            listBackLog : [],
            listTodo: [],
            listDoing: [],
            listDone: [],
            email: '',
            password: '',
            username: '',
            task: ''
        }
    },
    components:{
        Home,
        FormLogin,
        NavBar,
        FormRegister,
        FormAddTask,
        FormEditTask
    },
    methods: {
       fetchListTask(){
           axios({
               method: "GET",
               url: `${this.server}/task`,
                headers:{
                    "access_token" : localStorage.access_token
               },
           })
           .then(response=>{
                let data = response.data
                this.listBackLog = data.filter(data => data.category == 'backLog')
                this.listDoing = data.filter(data => data.category == 'doing')
                this.listTodo = data.filter(data => data.category == 'todo')
                this.listDone = data.filter(data => data.category == 'done')
           })
           .catch(err=>{
               console.log(err)
           })
       },
       findOne(id){
           axios({
               method: "GET",
               url: `${this.server}/task/${id}`,
                headers:{
                    "access_token" : localStorage.access_token
               },
           })
           .then(response=>{
                let data = response.data
                this.task = data
           })
           .catch(err=>{
               console.log(err)
           })
       },

       checkAuth(){
            if(localStorage.getItem('access_token')){
                this.currentPage = "home"
                this.fetchListTask()
                
            }else{
                this.currentPage = "login"
            }
        },

        changePage(page){
            this.findOne()
            this.currentPage = page
            
            
        }
    },
    created(){
        this.checkAuth()
    }
}
</script>

<style>

</style>