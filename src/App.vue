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
            @editCategory="editCategory"
            @editTask="editTask"
            ></Home>
        </div>

         <div v-if="currentPage == 'login'">
            <FormLogin
            @checkAuth="checkAuth"
            @changePage="changePage"
            ></FormLogin>
        </div>

        <div v-if="currentPage == 'register'">
            <FormRegister
            @checkAuth="checkAuth"
            ></FormRegister>
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

        <div v-if="currentPage == 'form-edit-category'">
            <FormEditCategory
            :task="task"
            @checkAuth="checkAuth"
            ></FormEditCategory>
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
import FormEditCategory from "./components/FormEditCategory"
import Swal from 'sweetalert2'
export default {
    name: "App",
    data(){
        return{
            currentPage: "login",
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
        FormEditTask,
        FormEditCategory
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
                Swal.fire({
                    icon: 'error',
                    title: `${err}`,
                    showConfirmButton: false,
                    timer: 2000
                })
           })
       },
       editTask(id){
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
                this.changePage('form-edit-task')
           })
           .catch(err=>{
                Swal.fire({
                   icon: 'error',
                   title: `${err.response.data.message}`,
                   showConfirmButton: false,
                   timer: 3000
                })
           })
       },
       editCategory(id){
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
                this.changePage('form-edit-category')
           })
           .catch(err=>{
                Swal.fire({
                   icon: 'error',
                   title: `${err.response.data.message}`,
                   showConfirmButton: false,
                   timer: 3000
                })
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