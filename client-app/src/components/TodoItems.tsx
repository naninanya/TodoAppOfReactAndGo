import { AllItemsPropsType } from "../types";
import TodoItem from "./TodoItem";

const TodoItems = ({ items, setCompleted }: AllItemsPropsType) => {
    return (
        <>
            {items.map((item) => <TodoItem item={item} setCompleted={setCompleted} />)}
        </>
    );
};

export default TodoItems