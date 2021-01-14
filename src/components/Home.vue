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
        @findOne="findOne" 
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
        findOne(id){
            this.$emit("findOne", `${id}`)
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