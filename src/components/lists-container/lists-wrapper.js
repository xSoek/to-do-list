import React from "react";
import List from "../list-row/list-row";
import CreateNewList from "../list-row/create-new-list/create-new-list";
import "./style.css"

const ListsWrapper = (props) => {

    return (
        <div className="list-wrapper-main-container" style={{width: "35%"}}>
            <CreateNewList createList={props.createList}/>
            <ul className="list-wrapper"> 
                {
                    props.data.map((list, index) => {
                        return <List key={index} index={index} id={list.id} title={list.title} openList={props.openList} deleteList={props.deleteList}/>
                    })
                }   

            </ul>
        </div>
    )
}

export default ListsWrapper;