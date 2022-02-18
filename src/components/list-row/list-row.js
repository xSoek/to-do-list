import React from "react";
import deleteIcon from "../../media/images/delete.png";
import "./style.css"


class List extends React.Component {
    render () {
        return (
      
            <div className="list-main-container" onClick={() => {this.props.openList(this.props.index) }}>   
                <h2>{this.props.title}</h2>
                <div className="task-icons">
                    <span> 
                        <img src={`${deleteIcon}`} onClick={() => this.props.deleteList(this.props.index)} width="50%" id="delete-icon" alt="Delete Icon"/>
                    </span> 
                </div>
            </div>
        )
    }
}

export default List;