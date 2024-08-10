import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
    //  state for individual todo
    const [ todo, setTodo]=useState("");
    const { addTodo}=useTodo();
    // method here to add the now created todo using form . 
    const add=(e)=>{
        e.preventDefault()
        if(!todo) return 

        // addTodo({todo: todo, completed: false});//if our property and valuse is same so we can write only one time
        addTodo({todo, completed: false});//here todo is a state which store the newely created todos


        setTodo("");
    }
    return (
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

