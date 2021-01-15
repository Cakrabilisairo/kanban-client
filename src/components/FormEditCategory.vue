<template>
    <div class="container">
    <form id="form-edit" >
        <h1>Edit Task</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Task Title</label>
          <input type="text" readonly class="form-control" aria-describedby="emailHelp" v-model="title">
        </div>
        <div class="form-group mb-3">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea readonly class="form-control" rows="3" v-model="description"></textarea>
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
        <button type="submit" class="btn btn-primary" @click.prevent="editCategory(task.id)">Edit Task</button>
        <button type="submit" class="btn btn-danger" @click.prevent="cancel">Cancel</button>
      </form>
  </div>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
export default {
    name: "FormEditCategory",
    data(){
        return {
            server: 'http://localhost:3000',
            title: this.task.title,
            description: this.task.description,
            category: this.task.category
        }
    },
    methods:{
        editCategory(id){
            Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: `Save`,
            }).
            then((result) => {
                if (result.isConfirmed) {
                     axios({
                        method: "PATCH",
                        url: `${this.server}/task/${id}`,
                        headers:{
                            "access_token" : localStorage.access_token
                        },
                        data:{
                            category: this.category
                        }
                    })
                    .then(response=>{
                        this.$emit("checkAuth")
                         Swal.fire('Saved!', '', 'success')
                    })
                    .catch(err=>{
                        Swal.fire({
                           icon: 'error',
                           title: `${err.response.data[0].message}`,
                           showConfirmButton: false,
                           timer: 3000
                        })
                    })
                }else{
                    this.cancel()
                } 
            })
        },
        cancel(){
            this.$emit("checkAuth")
        }
    },
    props:['task']
}
</script>

<style>

</style>