import React, { useState } from "react";
import "./style.css"

const ExpandedTaskText = (props) => {
    const [taskDescription, setTaskDescription] = useState("");
    const updateTaskDescription = (e) => {
        setTaskDescription(e); 
        //console.log(taskDescription);
        props.updateTaskDescription(e);
    }

    console.log(props.taskClicked)
    return (
        <div className="expanded-task-text-main-container">
            <h3>{props.taskTitle[0]}</h3>
            <textarea disabled={!props.taskClicked} onChange={(e) => updateTaskDescription(e.target.value)} id="task-expanded-text" rows="10" cols="50" value={taskDescription && props.taskClicked===false && props.taskDescription!=="" ? taskDescription : props.taskDescription}></textarea>
        </div>
    )

}

export default ExpandedTaskText;