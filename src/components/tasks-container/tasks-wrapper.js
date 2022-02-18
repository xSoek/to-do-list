import React from "react";
import Task from "../task-row/task-row";
import "./style.css"

const TasksWrapper = (props) => {
    return (
        <ul className="tasks-wrapper-main-container">    
            {
                props.data.tasks.map((task, index) => {
                    return <Task key={index} index={index} taskState={0} title={task} createdTask={"createdTask"} editTask={props.editTask} deleteTask={props.deleteTask} setTaskDescription={props.setTaskDescription} />
                })
            }
            <Task taskState={2} editTask={props.editTask} createNewTask={props.createNewTask}/>
        </ul>
    )
}

export default TasksWrapper;