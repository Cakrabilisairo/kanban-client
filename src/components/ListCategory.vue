<template>
   <div class="container category" >
        <div id="flex-child" class="row" v-for="(category, i ) in listCategory" :key="i">
            <div class="">
                <div id="category-list">
                    <h3>{{category}}</h3>
                    <div v-if="category == 'Back Log'">
                        <ListTask 
                        :listTask="listBackLog"
                        @checkAuth="checkAuth"
                        @editCategory="editCategory"
                        @editTask="editTask"
                        ></ListTask>
                    </div>
                    <div v-if="category == 'Todo'">
                        <ListTask 
                        :listTask="listTodo"
                        @checkAuth="checkAuth"
                        @editCategory="editCategory"
                        @editTask="editTask"
                        ></ListTask>
                    </div>
                    <div v-if="category == 'Doing'">
                        <ListTask 
                        :listTask="listDoing"
                        @checkAuth="checkAuth"
                        @editCategory="editCategory"
                        @editTask="editTask"
                        ></ListTask>
                    </div>
                    <div v-if="category == 'Done'">
                        <ListTask 
                        :listTask="listDone"
                        @checkAuth="checkAuth"
                        @editCategory="editCategory"
                        @editTask="editTask"
                        ></ListTask>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import ListTask from "./ListTask"
import Swal from 'sweetalert2'
export default {
    name: "ListCategory",
    components:{
        ListTask
    },
    methods:{
        checkAuth(){
            this.$emit("checkAuth")
        },
        editCategory(id){
            this.$emit("editCategory", `${id}`)
        },
        editTask(id){
            this.$emit("editTask", `${id}`)
        }
    },
      props: [
        "listCategory",
        "listBackLog",
        "listTodo",
        "listDoing",
        "listDone"
        ]
}
</script>

<style>

</style>