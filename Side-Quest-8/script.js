const form = document.getElementById("form")
const input = document.getElementById("input-field")
const container = document.getElementById("container")
const addbtn = document.getElementById("add-btn")

let todos = []
let editingId = null

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
                <button data-action="delete" data-id="${todo.id}">Delete</button>
                <button data-action="edit" data-id="${todo.id}">Edit a task</button>
                
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

function editTodo(id, newTask){
    todos = todos.map(todo => {
        if(todo.id === id){
            return { ...todo, task: newTask}
        }
        return todo;
    })
    renderTodos()
}

container.addEventListener('click', (e) => {
    const button = e.target.closest('button')
    const action = button.dataset.action
    const id = Number(button.dataset.id)
    
    if(action === "delete"){
        deleteTodo(id)
    }
    
    if(action === "edit"){
        editingId = id
        const findId = todos.find(todo => todo.id === editingId)
        input.value = findId.task
        addbtn.innerHTML = "save"
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const inputValue = input.value.trim()

    if(!inputValue) return;

    if(editingId !== null){
        editTodo(editingId, inputValue)
        editingId = null
        input.value = ''
        addbtn.innerHTML = "add todo"
    } else {
        addTodo(inputValue)
        input.value = ''
    }
})



