import React, { useState } from "react";
import TodoList from "./TodoList";
import swal from "sweetalert";

function CreateTodo() {
  const [todo, setTodo] = useState({ title: "", done: false });
  const [todoArr, setTodoArr] = useState([]);

  let todos = localStorage.hasOwnProperty("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  function handleChange(e) {
    let { value } = e.target;
    let obj = {};
    obj.title = value;
    obj.done = false;
    setTodo(obj);
  }
  function createTodo(e) {
    const { name } = e.target;
    if (e.key === "Enter" || name === "addTodo") {
      if (todo.title !== "") {
        todos.unshift(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodo({ title: "", done: false });
      } else {
        swal("Oops", "Please write todo first", "error");
      }
    }
  }

  function completeTodo(i) {
    if (todos[i].done !== true) {
      todos[i].done = true;
      localStorage.setItem("todos", JSON.stringify(todos));
      setTodoArr(todos);
      swal("Good job!", "Todo Completed", "success");
    }
  }
  function deleteTodo(i) {
    todos = todos.filter((todo, index) => {
      return index !== i;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodoArr(todos);
    swal("Done", "Todo deleted", "success");
  }
  return (
    <>
      <div className="box">
        <div className="text-end">
          <h2>React Todo App</h2>
          <h4>Add a new Todo</h4>
        </div>
        <div className="text-addTodo">
          <input
            type="text"
            name="todo"
            placeholder="Write here..."
            value={todo.title}
            onKeyPress={createTodo}
            onChange={handleChange}
          />
          <button
            className="btn-addTodo"
            type="button"
            name="addTodo"
            onClick={createTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
      <TodoList
        todoArr={todoArr}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default CreateTodo;
