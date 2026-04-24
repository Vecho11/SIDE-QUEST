const form = document.getElementById("form")
const input = document.getElementById("input-field")
const container = document.getElementById("container")

let todos = []

function addTodo(text){
    const newTodo = {
        id: todos.length + 1,
        task: text,
        completed: false
    }

    todos = [...todos, newTodo]

    renderTodos()
}

function renderTodos(){
    container.innerHTML = todos.map(todo => {
        return `
            <div>
                <p>
                    <span onclick="toggleTodo(${todo.id})" style="text-decoration:${todo.completed ? 'line-through' : 'none'}">
                    ${todo.task}
                    </span>
                </p>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `
    }).join('')
}

function toggleTodo(id){
    todos = todos.map(todo => {
       return todo.id === id
       ? { ...todo, completed: !todo.completed } 
       : todo
    })

    renderTodos()
}

function deleteTodo(id){
    todos = todos.filter(todo => todo.id !== id)
    renderTodos()
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = input.value.trim()

    if(inputValue === "") return;

    addTodo(inputValue)
    input.value = ""
})

