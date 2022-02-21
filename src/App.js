import React from 'react';
import ListViewer from './components/list-viewer/list-viewer';
import ListsWrapper from './components/lists-container/lists-wrapper';
import './App.css';

const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if(list) {
    return JSON.parse(list);
  } else {
    let initTask1 = ["New Task", "Task description..."]
    let initTask2 = ["New Task", "Task description..."]
    let initTask3 = ["New Task", "Task description..."]
    let initList = {
      "id": 0, 
      "title": "New List", 
      "tasks": [initTask1, initTask2, initTask3]
    }
    let initData = [initList]
    return initData;
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: getLocalItems(),
      currentListIndex: 0,
      currentListName: "New List",
      taskClicked: false,
      taskIndex: 0,
      currentTaskDescription: "", 
      currentTaskTitle: "", 
      IDcounter: 0,
    }
  }

  componentDidMount() {
    this.openList(0);
  }

  componentDidUpdate() {
    localStorage.setItem('lists', JSON.stringify(this.state.data))
  }

  setListNameToPrevious = () => {
    this.setState({currentListName: this.state.data[this.state.currentListIndex].title})
  }

  handleListNameChange = (e) => {
    this.setState({currentListName: e.target.value});
  }

  createNewList = () => {
    let task1 = ["New Task", "Task description..."]
    let task2 = ["New Task", "Task description..."]
    let task3 = ["New Task", "Task description..."]
    let newList = {
      "id": this.state.IDcounter, 
      "title": "New List", 
      "tasks": [task1, task2, task3]
    }

    this.setState({IDcounter: this.state.IDcounter + 1})
    this.setState({currentListName: newList.title})
    this.setState({data: [...this.state.data, newList]}, () => {this.openList(this.state.data.length-1)});

  }

  editListName = () => {
    let tempArr = this.state.data;
    tempArr[this.state.currentListIndex].title = this.state.currentListName;
    this.setState({data: tempArr});
  }

  openList = (index) => {
    if(this.state.data[index] !== undefined) {
      this.setState({currentListIndex: index})
      this.setState({currentListName: this.state.data[index].title})

      var lists = document.getElementsByClassName("list-main-container");
      for (let i=0; i < lists.length; i++) {
          lists[i].removeAttribute("id");
      }
      lists[index].setAttribute("id", "active-list");
    }

  }


  deleteList = (index) => {
    let tempArr = this.state.data;
    tempArr.splice(index, 1);

    this.setState({data: tempArr});
    if(this.state.data.length === 0) {
      this.createNewList();
    }

    if(this.state.data.length > 0) {
      this.setState({currentListIndex: 0, currentListName: this.state.data[0].title});
      this.openList(0);
    }

    this.setState({taskClicked: false, currentTaskDescription: "", currentTaskTitle: "" });
  }

  createNewTask = () => {
    let newTask = ["New Task",  "task description trial"]
    let tempArr = this.state.data;
    tempArr[this.state.currentListIndex].tasks.push(newTask)
    this.setState({data: tempArr});
  }

  editTask = (taskIndex, task) => {
    let tempArr = this.state.data;

    tempArr[this.state.currentListIndex].tasks[taskIndex][0] = task

    this.setState({data: tempArr});
  }

  deleteTask = (taskIndex) => {
    this.setState({taskClicked: false, currentTaskDescription: "", currentTaskTitle:"" });
    let tempArr = this.state.data;
    tempArr[this.state.currentListIndex].tasks.splice(taskIndex, 1);
    this.setState({data: tempArr});
  }

  setTaskDescription = (index) => {
    if(this.state.data[this.state.currentListIndex].tasks[index] === undefined ){
      this.setState({currentTaskDescription: "",  currentTaskTitle:"", taskClicked: false});
    } else {

      this.setState({currentTaskDescription: this.state.data[this.state.currentListIndex].tasks[index][1], currentTaskTitle: this.state.data[this.state.currentListIndex].tasks[index],  taskClicked: true, taskIndex: index});
    }

  }

  updateTaskDescription = (taskDescription) => {
    this.setState({currentTaskDescription: taskDescription});
    let tempArr = this.state.data;
    tempArr[this.state.currentListIndex].tasks[this.state.taskIndex][1] = taskDescription;
    this.setState({data: tempArr});

  }

  render () {  
    return (
      <div className="App">
        <ListViewer 
          data={this.state.data[this.state.currentListIndex]}
          listTitle = {this.state.currentListName}

          editTask={this.editTask}
          deleteTask={this.deleteTask} 
          createNewTask={this.createNewTask}
          setTaskDescription={this.setTaskDescription}

          handleChange={this.handleListNameChange}
          setListNameToPrevious={this.setListNameToPrevious}
          editListName={this.editListName} 
        />
        
        <ListsWrapper 
          data={this.state.data} 
          openList={this.openList} 
          createList={this.createNewList}
          deleteList={this.deleteList}

          taskClicked={this.state.taskClicked}
          taskTitle={this.state.currentTaskTitle}
          taskDescription={this.state.currentTaskDescription}
          updateTaskDescription={this.updateTaskDescription}
        />
      </div>
    );
  }
}

export default App;
