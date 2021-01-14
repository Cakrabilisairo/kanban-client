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
                        @changePage="changePage"
                        @findOne="findOne"
                        ></ListTask>
                    </div>
                    <div v-if="category == 'Todo'">
                        <ListTask 
                        :listTask="listTodo"
                        @checkAuth="checkAuth"
                        @changePage="changePage"
                        @findOne="findOne"
                        ></ListTask>
                    </div>
                    <div v-if="category == 'Doing'">
                        <ListTask 
                        :listTask="listDoing"
                        @checkAuth="checkAuth"
                        @changePage="changePage"
                        @findOne="findOne"
                        ></ListTask>
                    </div>
                    <div v-if="category == 'Done'">
                        <ListTask 
                        :listTask="listDone"
                        @checkAuth="checkAuth"
                        @changePage="changePage"
                        @findOne="findOne"
                        ></ListTask>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import ListTask from "./ListTask"
export default {
    name: "ListCategory",
    components:{
        ListTask
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