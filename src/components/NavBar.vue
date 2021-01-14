<template>
  <div id="nav-bar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Kanban</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" @click.prevent="addForm">Add Task</a>
                    </li>
                </ul>
                <button type="button" class="btn btn-danger" @click.prevent="logout">log Out</button>
            </div>
        </div>
    </nav>  
  </div>
</template>

<script>
export default {
    name: "NavBar",
    methods:{
        logout(){
            localStorage.clear()
            this.$emit("checkAuth")
        },
        addForm(){
            this.$emit("changePage", "form-add")
        }
    }
}
</script>

<style>

</style>