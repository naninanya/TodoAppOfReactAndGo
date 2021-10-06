import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
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
                <br />
                <TextField label="TODO" variant="standard"
                    type="text" name="todoItem"
                    onChange={e => setTodoName(e.target.value)} value={todoName} />
                <br />
                <br />
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Add</Button>
            </form>
        </>
    );
};
export default Form;