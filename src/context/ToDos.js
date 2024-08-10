import { createContext, useContext } from "react";

export const TodoContext= createContext({
    todos: [
        {
            id:1, 
            todo: "Tdo msg",
            completed: false
        }
    ],
    // ^ this is property not the methode , below we will declare   methods not define them , we will define them at app.js 
    
    addTodo: (todo)=>{},
    updateTodo: (id , todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{}
})

export const useTodo=()=>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider;