import { useState,useEffect } from "react";



function ToDoList(){

    const [tasks, setTask] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [newTask,setNewTask]=useState("")

    const [editingIndex, setEditingIndex] = useState(null);

    const [errorMessage, setErrorMessage] = useState("")
    const [showInput, setShowInput] = useState(false); 

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);

      useEffect(() => {
        if (errorMessage) {
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      })
        
    
    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim() !==""){
            if (newTask.length >= 20) {
                setErrorMessage("Task should not exceed 20 characters!");
              }else if(!tasks.some((task) => task.toLowerCase() === newTask.toLowerCase())){
                    setTask(t=>[...t,newTask])
                    setNewTask("")
                    setErrorMessage("")
                    setShowInput(false)
                    }else{
                        setErrorMessage("Task already exists!");
                    }
                }
        }

    function deleteTask(index){
        const updatedTasks = tasks.filter((element,i)=>i!==index)
        setTask(updatedTasks)
    }

    function moveTaskUp(index) {
        if (index > 0) {
          const updatedTasks = [...tasks];
          const temp = updatedTasks[index];
          updatedTasks[index] = updatedTasks[index - 1];
          updatedTasks[index - 1] = temp;
          setTask(updatedTasks);
        }
      }
      
      

      function moveTaskDown(index) {
        if (index < tasks.length - 1) {
          const updatedTasks = [...tasks];
          const temp = updatedTasks[index];
          updatedTasks[index] = updatedTasks[index + 1];
          updatedTasks[index + 1] = temp;
          setTask(updatedTasks);
        }
      }

      function startEditing(index) {
        setEditingIndex(index);
        setNewTask(tasks[index]);
      }
    
      function finishEditing() {
        if (editingIndex !== null && newTask.trim() !== "") {
          if(newTask.length <= 20){
            if (
                !tasks
                  .slice(0, editingIndex)
                  .some((task) => task.toLowerCase() === newTask.toLowerCase()) &&
                !tasks
                  .slice(editingIndex + 1)
                  .some((task) => task.toLowerCase() === newTask.toLowerCase())
              ){
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = newTask;
                setTask(updatedTasks);
                setEditingIndex(null);
                setNewTask("");
                setErrorMessage("")
            }else{
                setErrorMessage("Task cannot be updated already exists!")
            }
         }else{
            errorMessage("Task should not exceed 20 characters!")
         }
        }
      }
      

    return(<div className="to-do-list">
        <h1>To-Do-List</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div>
        {showInput && (
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
          />
        )}
        <button className="add-button" onClick={() => setShowInput(!showInput)}>
          <img className="button-img" src="src/assets/icons8-add-button-60.png" alt="" />
        </button>
        {showInput && (
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
        )}
        </div>

        <ol>
        {tasks.map((task, index) => (
  <li key={index} className={editingIndex === index ? "editing" : ""}>
    {editingIndex === index ? (
      <>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="save-button" onClick={finishEditing}>Save</button>
      </>
    ) : (
      <>
        <span>{index+1}.</span>
        <span className="text">{task}</span>
        <button
          className="delete-button"
          onClick={() => deleteTask(index)}
        >
                <img className="button-img" 
                src="src/assets/icons8-trash-can-96.png" 
                alt="" />
        </button>
        <button
          className="move-button"
          onClick={() => moveTaskUp(index)}
        >
         <img
                  className="button-img"
                  src="src/assets/icons8-up-64.png"
                alt="imag" />
        </button>
        <button
          className="move-button"
          onClick={() => moveTaskDown(index)}
        >
          <img
                  className="button-img"
                  src="src/assets/icons8-down-64.png"
                alt="" />
        </button>
        <button
          className="edit-button"
          onClick={() => startEditing(index)}
        >
          <img className="button-img"
           src="src/assets/icons8-edit-64.png"
           alt="" />
        </button>
      </>
    )}
  </li>
))}

        </ol>
        
    </div>)

}

export default ToDoList