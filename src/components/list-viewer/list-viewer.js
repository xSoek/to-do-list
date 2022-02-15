import React, {useState} from "react";
import TasksWrapper from "../tasks-container/tasks-wrapper";

import acceptIcon from "../../media/images/accept.png";
import cancelIcon from "../../media/images/cancel.png";
import editIcon from "../../media/images/edit.png";

import "./style.css"

const ListViewer = (props) => {
    const [isTitleDifferent, setIsTitleDifferent] = useState(false);
    const titleChanged = (e) => {

        let inputValue = document.getElementById("list-name-input").value;
        if(inputValue !== props.data.title) {
            setIsTitleDifferent(true);
        }
        else {
            setIsTitleDifferent(false);
        }
        props.handleChange(e)
    }

    const cancelTitleAction = () => {
        props.setListNameToPrevious();
        setIsTitleDifferent(false);
    }

    const checkValidValue = () => {
        if(document.getElementById("list-name-input").value !== '') {
            props.editListName(); 
            setIsTitleDifferent(false)
        }
        else {
            document.getElementById("input-error-message").style.opacity = 1;
        }
    }

    return (
        <div className="list-viewer-main-container" >
            <div className="input-list-container">
                <div className="list-name-input-container">
                    <input id="list-name-input" type="text" value={props.listTitle} onChange={(e) => {titleChanged(e); document.getElementById("input-error-message").style.opacity = 0;}}/>
                    <img src={`${editIcon}`} width="20px" alt="Edit Icon"/>
                </div>
                <div className="list-name-icons" style={{width:"50px"}} style={isTitleDifferent !== true ? {visibility:"hidden"}: {visibility:"visible"}}>
                    <span>
                        <img src={`${acceptIcon}`} onClick={() => {checkValidValue()}} width="20px" alt="Edit Icon"/>
                    </span>
                    <span>
                        <img src={`${cancelIcon}`} onClick={() => {cancelTitleAction()}} width="15px" alt="Delete Icon"/>
                    </span>
                </div>
                
            </div> 
            <p id="input-error-message"> Invalid input value</p>

            <TasksWrapper data={props.data} editTask={props.editTask} deleteTask={props.deleteTask} createNewTask={props.createNewTask}/>
        </div>
    )
}

export default ListViewer;