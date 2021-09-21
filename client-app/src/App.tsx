import React, { useState } from 'react';
import './App.css';
import './components/TodoItem';
import TodoItem, { ItemType } from './components/TodoItem';

function App() {
  const [item, setItem] = useState<ItemType>({
    id: 0,
    name: "",
  });

  const getTodo = () => {
    fetch('http://localhost:1323/test', { mode: 'cors' })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setItem({
          id: data.id,
          name: data.name,
        })
      })
      .catch(err => {
        alert("Error occurred.")
        console.log(err)
      })
  }

  return (
    <div className="App">
      <button type="submit" onClick={getTodo} >api test</button>
      <TodoItem item={item} />
    </div>
  );
}

export default App;
