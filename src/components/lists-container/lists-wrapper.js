import React from "react";
import List from "../list-row/list-row";
import CreateNewList from "../list-row/create-new-list/create-new-list";
import ExpandedTaskText from "../task-expanded-text/task-expanded-text";
import "./style.css"

const ListsWrapper = (props) => {

    return (
        <div className="right-column" style={{width: "35%", marginLeft:"3%"}}>
            <div className="list-wrapper-main-container" >
                <CreateNewList createList={props.createList}/>
                <ul className="list-wrapper"> 
                    {
                        props.data.map((list, index) => {
                            return <List key={index} index={index} id={list.id} title={list.title} openList={props.openList} deleteList={props.deleteList}/>
                        })
                    }   

                </ul>
            </div>
            <ExpandedTaskText taskTitle={props.taskTitle} taskDescription={props.taskDescription} updateTaskDescription={props.updateTaskDescription} taskClicked={props.taskClicked} />
        </div>
        
    )
}

export default ListsWrapper;