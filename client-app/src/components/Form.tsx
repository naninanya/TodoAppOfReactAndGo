import { useState } from "react";
import { AllItemsPropsType, SingleTodoItemType } from "../types";

const Form = ({ items, setItems }: AllItemsPropsType) => {
    const [todoName, setTodoName] = useState<string>("");

    const addTodoItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!todoName) {
            return
        }

        const url = `/api/save/${todoName}`;
        const requestOption = {
            method: "POST",
        };

        fetch(url, requestOption)
            .then(res => res.json())
            .then(data => {
                const newItem: SingleTodoItemType = {
                    Id: data.id,
                    Name: todoName,
                    isCompleted: false,
                };
                setItems(items.concat(newItem))
            })
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