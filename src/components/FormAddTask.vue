<template>
  <div class="container">
      <form id="form-add" @submit.prevent="addNewTask">
          <h1>Add Task</h1>
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
          <button type="submit" class="btn btn-primary">Add Task</button>
          <button type="submit" class="btn btn-danger" @click.prevent="cancel">Cancel</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2' 
export default {
    name: "FormAddTask",
    data(){
        return {
            server:'http://localhost:3000',
            title: '',
            description: '',
            category: 'Choose'

        }
    },
    methods:{
        addNewTask(){
            axios({
                method: "POST",
                url: `${this.server}/task`,
                headers:{
                    "access_token" : localStorage.access_token
                },
                data:{
                    title: this.title,
                    description: this.description,
                    category: this.category
                }
            })
            .then(response=>{
                this.successAddResponse(this.category)
                this.$emit("checkAuth")
                this.title = ''
                this.description = ''
                this.category = ''
            })
            .catch(err=>{
                Swal.fire({
                icon: 'error',
                title: `${err.response.data[0].message}`,
                showConfirmButton: false,
                timer: 3000
                })
            })
        },
        cancel(){
            this.$emit("checkAuth")
        },

        successAddResponse(category){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Your task has been added to ${category}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}
</script>

<style>

</style>