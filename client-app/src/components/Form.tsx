import { useState } from "react";
import { FormPropsType } from "../types";

const Form = ({ addNewItem }: FormPropsType) => {
    const [todoName, setTodoName] = useState<string>("");

    const addTodoItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`http://localhost:1323/api/save/${todoName}`, { method: "POST" })
            .then(res => res.json())
            .then(data => addNewItem(data.id, todoName))
            .catch(err => {
                alert("Error occurred. " + err);
                console.log(err);
            })
        setTodoName("");
    }

    return (
        <>
            <form onSubmit={addTodoItem}>
                <input className="AddTodoInput" type="text" name="todoItem" placeholder="todo..."
                    onChange={e => setTodoName(e.target.value)} value={todoName} />
                <br />
                <button className="AddTodoButton" type="submit">Add</button>
            </form>
        </>
    );
};
export default Form;