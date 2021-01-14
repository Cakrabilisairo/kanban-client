<template>
<div >
    <div class="card border-light mb-3" style="max-width: 18rem;" v-for="Task in listTask" :key="Task.id">
        <div class="card-header">{{Task.User.username}}</div>
        <div class="card-body">
            <h5 class="card-title">{{Task.title}}</h5>
            <p class="card-text">{{Task.description}}</p>
            <div id="tools-ikon">
                <a href=""><i class="material-icons edit" @click.prevent="toEditForm(Task.id)" >edit</i></a>
                <a href=""><i class="material-icons update">update</i></a>
                <a href=""><i class="material-icons delete_forever" @click.prevent="deleteTask(Task.id)" >delete_forever</i></a>
            </div>
        </div>
        <div class="card-footer bg-transparent border-light text-muted">{{Task.updatedAt}}</div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "ListTask",
    data(){
        return {
            server:'http://localhost:3000',
        } 
    },
    methods:{
        deleteTask(id){
            axios({
                method: "DELETE",
                url: `${this.server}/task/${id}`,
                headers: {
                    "access_token" : localStorage.access_token
                }
            })
            .then(response=>{
                this.$emit("checkAuth")
            })
            .catch(err=>{
                console.log(err)
            })
        },
        toEditForm(id){
            this.$emit("changePage", "form-edit-task")
            this.$emit("findOne",`${id}`)
        },
    },
    props:["listTask"]
}
</script>

<style>

</style>