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
        <button type="submit" class="btn btn-primary" @click.prevent="editTask(task.id)">Edit Task</button>
        <button type="submit" class="btn btn-danger" @click.prevent="cancel">Cancel</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2' 
export default {
    name: "FormEditTask",
    data(){
        return{
            server: 'http://localhost:3000',
            title: this.task.title,
            description: this.task.description,
        }
    },
    methods:{
        editTask(id){
            Swal.fire({
                  title: 'Do you want to save the changes?',
                  showCancelButton: true,
                  confirmButtonText: `Save`,
                }).
                then((result) => {
                    if (result.isConfirmed) {
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
    props: ["task"]
}
</script>

<style>

</style>