import React, { useState } from 'react'

export const Todo = () => {

    const [task , updatetask] = useState(["hello", "hi"]);

    function additem() {
        const newitem = document.getElementById("todoapp").value
        document.getElementById("todoapp").value = ""
        updatetask(t => [...t, newitem])
    }

    function deleteitem(index){
        updatetask(task.filter((_, i) => i !== index))
    }

    function upitem(index){
        const newtask = [...task]
        if (index > 0){
            [newtask[index] , newtask[index - 1]] = [newtask[index - 1] , newtask[index]]
            updatetask(newtask)
        }
    }

    function downitem(index){
        const newtask = [...task]
        if (index < newtask.length - 1){
            [newtask[index] , newtask[index + 1]] = [newtask[index + 1] , newtask[index]]
            updatetask(newtask)
        }
    }

    return (
        <div className="Todo">
            <h1>To do app</h1>
            <input type='text' id='todoapp' placeholder='Enter your task'/>
            <button onClick={additem}>add item</button>
            <ol>
                {task.map((task, index) => 
                    <li key={index} >
                        <span>{task}</span>
                        <button onClick={() => upitem(index)}>up</button>
                        <button onClick={() => downitem(index)}>down</button>
                        <button onClick={() => deleteitem(index)}>delete</button>
                    </li>)}
            </ol>
        </div>
    )
}
