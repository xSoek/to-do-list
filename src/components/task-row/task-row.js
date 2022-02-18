import React from "react";
import acceptIcon from "../../media/images/accept.png";
import cancelIcon from "../../media/images/cancel.png";
import deleteIcon from "../../media/images/delete.png";
import editIcon from "../../media/images/edit.png";
import addIcon from "../../media/images/add.png";
import "./style.css"

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            taskState: this.props.taskState,
            previousState: 99,
            taskTitle: "",
        }
    }

    modifyTask = (newTask) => {
        console.log(newTask)
        this.setState({taskTitle: newTask})
    }

    changeState = (newState) => {
        if(newState === 1 ){
            this.setState({taskTitle: this.props.title})
        }
        this.setState({previousState: this.state.taskState, taskState: newState})
    }

    changeToPreviousState = () => {
        this.setState({taskState: this.state.previousState})
    }


    checkTaskState = () => {
        if(this.state.taskState === 0)
        {
            return (
                <div className="task-main-container" onClick={() => this.props.setTaskDescription(this.props.index)}>
                    <h2>{this.props.title ? this.props.title[0] : "New Task" }</h2>
                    <div className="task-icons">
                        <div>
                            <img src={`${editIcon}`} onClick={() => this.changeState(1)} width="25px" height="25px" alt="Edit Icon"/>
                        </div>
                        <div>
                            <img src={`${deleteIcon}`} onClick={() => this.props.deleteTask(this.props.index)}  width="25px" alt="Delete Icon"/>
                        </div>
                    </div>
                </div>
                
            )
        }

        if(this.state.taskState === 1)
        {
            return (
                <div className="task-main-container">
                    <input type="text" defaultValue={this.props.title ? this.props.title[0] : "New Task" } onFocus={(e) => e.target.select()} onChange={(e) => this.modifyTask(e.target.value)}/>
                    <div className="task-icons">
                        <img src={`${acceptIcon}`} onClick={() => {this.props.editTask(this.props.index, this.state.taskTitle); this.changeState(0)}} width="30px" alt="Edit Icon"/>
                        <img src={`${cancelIcon}`}  onClick={() => this.changeToPreviousState()} height="25px" width="25px" alt="Delete Icon"/>
                    </div>
                </div>
            )
        }

        if(this.state.taskState === 2)
        {
            return (
                <div className="task-main-container create-new-task" onClick={this.props.createNewTask}>
                    <h2>{this.props.title ? this.props.title : "Create New Task" }</h2>
                    <div className="task-icons">
                        <svg className="add-task-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                    </div>
                </div>
            )
        }

    }

    render () {
        return (
            <li className={`${this.props.createdTask}`}>    
                {this.checkTaskState()}
            </li>
        )
    }
}

export default Task;