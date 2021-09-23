import { useEffect, useState } from 'react';
import './App.css';
import DeleteButton from './components/DeleteButton';
import Form from './components/Form';
import Title from './components/TItle';
import './components/TodoItems';
import TodoItem from './components/TodoItems';
import { AllTodoItemsType, SingleTodoItemType } from "./types"

function App() {
  const [allTodoItemsData, setAllTodoItemsData] = useState<AllTodoItemsType>([]);

  useEffect(() => {
    // If you want to check from iphone, you change localhost to your pc address.
    fetch('http://localhost:1323/api/todo', { mode: 'cors' })
      .then(res => res.json())
      .then(data => {
        const reData = data.map((item: SingleTodoItemType) => { item.isCompleted = false; return item; })
        setAllTodoItemsData(reData);
      })
      .catch(err => {
        alert("Error occurred. " + err);
        console.log(err);
      })
  }, [])

  const setCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = Number(e.currentTarget.id)
    setAllTodoItemsData(allTodoItemsData.map((item) => {
      if (item.Id === target)
        item.isCompleted = !item.isCompleted;
      return item;
    }
    ))
  }

  const addNewItem = (newId: number, name: string) => {
    const newItem: SingleTodoItemType = {
      Id: newId,
      Name: name,
      isCompleted: false,
    };
    setAllTodoItemsData(allTodoItemsData.concat(newItem))
  }

  return (
    <div className="App">
      <Title />
      <DeleteButton />
      <TodoItem items={allTodoItemsData} setCompleted={setCompleted} />
      <Form addNewItem={addNewItem} />
    </div>
  );
}

export default App;
