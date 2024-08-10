import { useState, useEffect } from 'react'
import {TodoProvider} from './context'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  // to do's , this state will  be a array of object , obj are todos,
  //  e.g. => [
  //              { id:1,
  //                todo: "Tdo msg",
  //                completed: false
  //              },
  //              { id:2,
  //                todo: "Tdo msg",
  //                completed: true
  //              } ,
  //              { id:3,
  //                todo: "Tdo msg",
  //                completed: false
  //              } 
  //         ]
  const [todos, setTodos] = useState([])
  //  define the method taken from the context api
  const addTodo = (todo) => {
    //  to add a new to do first make it like this
    // {
    //   id:1, 
    //   todo: "Tdo msg",
    //   completed: false
    // }
    //  put the id and spred the object to dos
    //  so except id all will change by obj todos
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    //  this will run when user click save ....so user has filled all the changes then click on button save so replace with previous to do.
    // need id to update, => take array of todos, if id of elem matched then put the new todo, either  teh previous to do.
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    // filter the todos.
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    // when id matched , then spread the todos object and replace the completed property with the opposit value. 
    setTodos(
      (prev) => 
      prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
      completed: !prevTodo.completed } : prevTodo))
  }

  //  now local storage codes . first time when site loades.., get all the information

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    //  check if todos is present or hav any element 
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, []) 
  // all valuse we get 
  //  save the value to local storage as we change it.

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App