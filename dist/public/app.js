new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){
      const query = `
        query{
          getTodos{
            id, title, done, createdAt, updatedAt
          }
        }
      `;

      fetch('/graphql', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(({data: {getTodos : todos}}) => {
        this.todos = this.todos.concat(todos);
      })
      .catch(err => console.log(err));
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        const query = `
          mutation{
            createTodo(todo: {title: "${title}"}){
              title, createdAt, updatedAt, done, id
            }
          }
        `;

        fetch('/graphql', {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({query})
        })
        .then(res => res.json())
        .then(({data: {createTodo}}) => {
          this.todos.push(createTodo);
          this.todoTitle = '';
        })
        .catch(err => console.log(err));
      },
      removeTodo(id) {
        const query = `
          mutation{
            removeTodo(id: "${id}")
          }
        `;

        fetch('/graphql', {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({query})
        })
        .then(res => res.json())
        .then(({data: {removeTodo}}) => {
          if(removeTodo)
            this.todos = this.todos.filter(t => t.id !== id);
          else throw new Error("I didn't delete this task");
        })
        .catch(err => console.log(err));
      },
      completeTodo(id){
        const query = `
          mutation{
            completeTodo(id: "${id}"){
              updatedAt
            }
          }
        `;

        fetch('/graphql', {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({query})
        })
        .then(res => res.json())
        .then(({data: {completeTodo}}) => {
          const indx = this.todos.findIndex(listTodo => listTodo.id === id);
          this.todos[indx].updatedAt = +completeTodo.updatedAt;
        })
        .catch(err => console.log(err));
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        };

        if(withTime){
            options.hour = '2-digit';
            options.minute = '2-digit';
            options.second = '2-digit';
        }
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
      }
    }
  })