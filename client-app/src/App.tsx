import { useEffect, useState } from 'react';
import './App.css';
import DeleteButton from './components/DeleteButton';
import Form from './components/Form';
import Title from './components/TItle';
import './components/TodoItems';
import TodoItem from './components/TodoItems';
import { AllTodoItemsType, SingleTodoItemType } from "./types"

function App() {
  const [todoItemsData, setTodoItemsData] = useState<AllTodoItemsType>([]);

  useEffect(() => {
    // If you want to check from iphone, you change localhost to your pc address.
    fetch('http://localhost:1323/api/todo', { mode: 'cors' })
      .then(res => res.json())
      .then(data => {
        const reData = data.map((item: SingleTodoItemType) => { item.isCompleted = false; return item; })
        setTodoItemsData(reData);
      })
      .catch(err => {
        alert("Error occurred. " + err);
        console.log(err);
      })
  }, [])

  const RemoveCompletedItem = () => {
    const notCompletedItem = todoItemsData.filter((item) => item.isCompleted)
    setTodoItemsData(notCompletedItem)
  }

  return (
    <div className="App">
      <Title />
      <DeleteButton />
      <TodoItem items={todoItemsData} setItems={setTodoItemsData} />
      <Form items={todoItemsData} setItems={setTodoItemsData} />
    </div>
  );
}

export default App;
