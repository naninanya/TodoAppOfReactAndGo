import React, { useEffect, useState } from 'react';
import './App.css';
import Title from './components/TItle';
import './components/TodoItems';
import TodoItem from './components/TodoItems';
import { AllTodoItemsType } from "./types"

function App() {
  const [allTodoItemsData, setAllTodoItemsData] = useState<AllTodoItemsType>([{
    Id: 0,
    Name: "",
  }]);

  useEffect(() => {
    fetch('http://localhost:1323/test', { mode: 'cors' })
      .then(res => res.json())
      .then(data => {
        setAllTodoItemsData(data)
      })
      .catch(err => {
        alert("Error occurred.")
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <Title />
      <TodoItem items={allTodoItemsData} />
    </div>
  );
}

export default App;
