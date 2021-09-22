const Form = () => {
    const addTodoItem = () => {

    }
    
    return (
        <>
            <form onSubmit={addTodoItem}>
                <input className="AddTodoInput" type="text" name="todoItem" placeholder="todo..." />
                <br />
                <button className="AddTodoButton" type="submit">Add</button>
            </form>
        </>
    );
};
export default Form;