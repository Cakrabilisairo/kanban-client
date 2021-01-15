<template>
<div >
    <div class="card border-light mb-3" style="max-width: 18rem;" v-for="Task in editedListTask" :key="Task.id">
        <div class="card-header">{{Task.User.username}}</div>
        <div class="card-body">
            <h5 class="card-title">{{Task.title}}</h5>
            <p class="card-text">{{Task.description}}</p>
            <div id="tools-ikon">
                <a href=""><i class="material-icons edit" @click.prevent="toEditForm(Task.id)" >edit</i></a>
                <a href=""><i class="material-icons update" @click.prevent="toEditCategory(Task.id)" >update</i></a>
                <a href=""><i class="material-icons delete_forever" @click.prevent="deleteTask(Task.id)" >delete_forever</i></a>
            </div>
        </div>
        <div class="card-footer bg-transparent border-light text-muted">{{Task.updatedAt}}</div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "ListTask",
    data(){
        return {
            server:'http://localhost:3000',
        } 
    },
    methods:{
        deleteTask(id){
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "DELETE",
                        url: `${this.server}/task/${id}`,
                        headers: {
                            "access_token" : localStorage.access_token
                        }
                    })
                    .then(response=>{
                        this.$emit("checkAuth")
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch(err=>{
                        Swal.fire({
                           icon: 'error',
                           title: `${err.response.data.message}`,
                           showConfirmButton: false,
                           timer: 3000
                        })
                    })
                    
                }
            })
        },
        toEditForm(id){
            this.$emit("editTask",`${id}`)
        },
        toEditCategory(id){
            this.$emit("editCategory",`${id}`)
        }
    },
    computed:{
        editedListTask(){
            let editedListTask =[]
            let listTask = this.listTask
            listTask.forEach((el)=>{
                el.updatedAt = new Date(el.updatedAt)
                el.updatedAt = el.updatedAt.toString().slice(0, 10)
                editedListTask.push(el)
            })
            return editedListTask
        }
    },
    props:["listTask"]
}
</script>

<style>

</style>