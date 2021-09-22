import { FormPropsType } from "../types";

const Form = ({ todoName, setTodoName }: FormPropsType) => {
    const addTodoItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`http://localhost:1323/api/save/${todoName}`, { method: "POST" })
            .then(res => {
                console.log(res)
                console.log(res.headers)
            })
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