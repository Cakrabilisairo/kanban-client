<template>
 <div>
     <ListCategory 
        :listCategory="listCategory"
        :listBackLog="listBackLog"
        :listTodo="listTodo"
        :listDoing="listDoing"
        :listDone="listDone"
        @checkAuth="checkAuth"
        @changePage="changePage"
        @editCategory="editCategory"
        @editTask="editTask" 
     ></ListCategory>
 </div>
</template>

<script>
import ListCategory from "./ListCategory"
export default {
    name: "Home",
    components:{
        ListCategory,
    },
    methods:{
        checkAuth(){
            this.$emit("checkAuth")
        },
        changePage(page){
            this.$emit("changePage", "form-edit-task")
        },
        editTask(id){
            this.$emit("editTask", `${id}`)
        },
        editCategory(id){
            this.$emit("editCategory", `${id}`)
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