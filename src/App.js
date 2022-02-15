import React from 'react';
import ListViewer from './components/list-viewer/list-viewer';
import ListsWrapper from './components/lists-container/lists-wrapper';
import './App.css';

const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if(list) {
    return JSON.parse(list);
  } else {
    return
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: getLocalItems(),
      currentListIndex: 0,
      currentListName: "New List",
      IDcounter: 0,
    }
  }

  componentDidMount() {
    getLocalItems();
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
    let newList = {"id": this.state.IDcounter, "title": "New List", "tasks": ["New Task 1", "New Task 2", "New Task 3"]}

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
      console.log("OPENING list with index: " + index);
      console.log(this.state.data[index]);
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
    console.log("trying to delete: " + index)
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
  }

  createNewTask = () => {
    console.log("new task created")
    let newTask = "new Task";
    let tempArr = this.state.data;
    tempArr[this.state.currentListIndex].tasks.push(newTask)
    this.setState({data: tempArr});
  }

  editTask = (taskIndex, task) => {
    let tempArr = this.state.data;

    tempArr[this.state.currentListIndex].tasks[taskIndex] = task

    this.setState({data: tempArr});
  }

  deleteTask = (taskIndex) => {
    let tempArr = this.state.data;

    tempArr[this.state.currentListIndex].tasks.splice(taskIndex, 1);

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

          handleChange={this.handleListNameChange}
          setListNameToPrevious={this.setListNameToPrevious}
          editListName={this.editListName} 
        />
        
        <ListsWrapper 
          data={this.state.data} 
          openList={this.openList} 
          createList={this.createNewList}
          deleteList={this.deleteList}
        />
      </div>
    );
  }
}

export default App;
