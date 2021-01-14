var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      backLogs: '',
      doing: '',
      todo: '',
      done: '',
      user:{
        email: '',
        password: '',
        username: ''
      },
      tasks: {
        title: '',
        category: 'Choose',
        description: ''
      },
      page:'login',
      server:'http://localhost:3000'
    },

    methods:{
      gantiHalaman(page){
        this.page = page
      },

      checkAuth(){
        if(localStorage.getItem('access_token')){
          this.backLog()
          this.gantiHalaman('homepage')
        }else{
          this.gantiHalaman('login')
        }
      },
      registerForm(){
        this.gantiHalaman('register')
      },
      loginForm(){
        this.gantiHalaman('login')
      },

      register(){
        axios({
          method:'POST',
          url: this.server+'/register',
          data:{
            email: this.user.email,
            username: this.user.username,
            password: this.user.password
          }
        })
        .then(response=>{
          this.email = ''
          this.password = ''
          this.usename = ''
          this.gantiHalaman('login')
        })
        .catch(err=>{
          console.log(err)
        })
      },
      login(){
        axios({
          method:'POST',
          url: this.server+'/login',
          data:{
            email: this.email,
            password: this.password
          }
        })
        .then(response=>{
          this.email = ''
          this.password = ''
          this.checkAuth()
          localStorage.setItem('access_token', response.data.access_token)
          this.gantiHalaman('homepage')
          this.backLog()
          console.log(response)
        })
        .catch(err=>{
          console.log(err)
        })
      },

      logout(){
        localStorage.clear()
        this.checkAuth()
      },

      addBtn(){
        this.gantiHalaman('form-add')
      },

      deleteTask(){
        axios({
          method: 'GET',
          url: this.server+'/delete/'+key,
          headers:{
            "access_token" : localStorage.access_token
          }
        })
        .then(response=>{
          this.checkAuth()
        })
        .catch(err=>{
          console.log(err)
        })
      },

      addTask(){
        axios({
          method:'POST',
          url: this.server+'/task',
          headers:{
            "access_token" : localStorage.access_token
          },
          data:{
            title: this.tasks.title,
            category: this.tasks.category,
            description: this.tasks.description
          }
        })
        .then(response=>{
          this.checkAuth()
          this.tasks.title = ''
          this.tasks.description = ''
        })
        .catch(err=>{
          console.log(err)
        })
      },
      cancelBtn(){
        this.checkAuth()
      },
      backLog(){
        axios({
          method: 'GET',
          url: this.server+'/task',
          headers:{
            "access_token" : localStorage.access_token
          }
        })
        .then(response=>{
          let result = response.data
          this.backLogs = result.filter(result => result.category == 'backLog')
          this.doing = result.filter(result => result.category == 'doing')
          this.todo = result.filter(result => result.category == 'todo')
          this.done = result.filter(result => result.category == 'done')
          console.log(response)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },

    created(){
     this.checkAuth()
    },

    // computed: {
    //   result(){
    //     return this.task.filter(task => task.category == 'backLog')
    //   }
    // }
  })