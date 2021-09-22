import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Title from './components/TItle';
import './components/TodoItems';
import TodoItem from './components/TodoItems';
import { AllTodoItemsType } from "./types"

function App() {
  const [allTodoItemsData, setAllTodoItemsData] = useState<AllTodoItemsType>([]);

  useEffect(() => {
    // If you want to check from iphone, you change localhost to your pc address.
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
      <Form />
    </div>
  );
}

export default App;
