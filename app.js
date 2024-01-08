
let filterValue="all"
const todoInput=document.querySelector(".todo-input");
const todoForm=document.querySelector(".todo-form");
const todoList=document.querySelector(".todoList")
const selectFilter=document.querySelector(".filter-todo")


todoForm.addEventListener('submit', addNewTodo);

document.addEventListener("DOMContentLoaded",e=>{
    const todos=getAllTodos();
    creatTodo(todos);
})

function addNewTodo(e){
    e.preventDefault();
    if(!todoInput.value) return null;
    const newTodo={
        id: Date.now(),
        createdAt:new Date().toISOString(),
        title:todoInput.value ,
        isCompleted:false

    }
    
    saveTodo(newTodo);
   filterTodos();
}

function creatTodo(todos){
    let result="";
    todos.forEach((todo)=>{
        result+=` <li class="todo">
        <p class="todo-title ${todo.isCompleted && "completed"}">${todo.title}</p>
        <span class="todocreatedAt">${new Date(todo.createdAt).toLocaleDateString("ger")}</span>
        <button class="todo-check" data-todo-id=${todo.id}><i class=" far fa-check-square"></i></button>
        <button class="todo-remove" data-todo-id=${todo.id}><i class=" far fa-trash-alt"></i></button>
    </li>`
   
    })
    
    todoList.innerHTML=result;
    todoInput.value="";
    const removeBtns=[...document.querySelectorAll(".todo-remove")];
    removeBtns.forEach(btn=>btn.addEventListener("click",removeTodo));
    const checkBtns=[...document.querySelectorAll(".todo-check")];
    checkBtns.forEach(btn=>btn.addEventListener("click",checkTodo));
}
selectFilter.addEventListener("change", (e)=>{
    filterValue=e.target.value;
    filterTodos();
});
function filterTodos(){
    let todos=getAllTodos();
    
    switch(filterValue){
        case 'all':
            creatTodo(todos);
            break;
        case 'completed':
           let filtered=todos.filter((t)=>t.isCompleted);
            creatTodo(filtered);
            break;
        case  'uncompleted':
            let filtered2=todos.filter((t)=>!t.isCompleted);
            creatTodo(filtered2);
            break;


    }

}
function removeTodo(e){
    let todos=getAllTodos();
    const todoId=Number(e.target.dataset.todoId);
    
   todos= todos.filter((item) =>item.id!==todoId);
   saveAllTodos(todos);
  
   filterTodos();

   
}
function checkTodo(e){
    let todos=getAllTodos();
    const todoId=Number(e.target.dataset.todoId);
    const todo=todos.find(t=>t.id===todoId);
    console.log(todo)
    todo.isCompleted = !todo.isCompleted;
    saveAllTodos(todos);
    filterTodos();

}
function getAllTodos(){
    const saveTodos=JSON.parse(localStorage.getItem("todos")) || [];
    return saveTodos;
}
function saveTodo(todo){
    const saveTodos=getAllTodos();
    saveTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(saveTodos));
    return saveTodos;

}
function saveAllTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));

}