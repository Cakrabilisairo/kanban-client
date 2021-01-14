<template>
  <div class="container">
    <form id="form-edit" >
        <h1>Edit Task</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Task Title</label>
          <input type="text" class="form-control" aria-describedby="emailHelp" v-model="title">
        </div>
        <div class="form-group mb-3">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea class="form-control" rows="3" v-model="description"></textarea>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Category</label>
            </div>
            <select class="custom-select" v-model="category">
              <option selected>Choose</option>
              <option value="backLog">Back Log</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        <button type="submit" class="btn btn-primary" @click.prevent="editTask(task.id)">Edit Task</button>
        <button type="submit" class="btn btn-danger">Cancel</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "FormEditTask",
    data(){
        return{
            server: 'http://localhost:3000',
            title: this.task.title,
            description: this.task.description,
            category: this.task.category
        }
    },
    methods:{
        editTask(id){
            axios({
                method: 'PUT',
                url: `${this.server}/task/${id}`,
                headers: {
                    "access_token" : localStorage.access_token
                },
                data:{
                    title: this.title,
                    description:this.description,
                    category: this.category
                }
            })
            .then(response=>{
                this.$emit("checkAuth")
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    props: ["task"]

}
</script>

<style>

</style>