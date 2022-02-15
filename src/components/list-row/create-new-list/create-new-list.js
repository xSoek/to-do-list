import React from "react";
import addIcon from "../../../media/images/add.png"
import "./style.css"

const CreateNewList = (props) => {
    return (
       <div className="add-new-list" onClick={() => props.createList()}>
            <h2>Click Here to create a new list</h2>
            <svg className="add-new-list-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        </div>
    )
}

export default CreateNewList;