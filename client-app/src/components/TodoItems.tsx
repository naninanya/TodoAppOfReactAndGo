import { AllItemsPropsType } from "../types";
import TodoItem from "./TodoItem";

const TodoItems = ({ items }: AllItemsPropsType) => {
    return (
        <>
            {items.map((item) => <TodoItem item={item} />)}
        </>
    );
};

export default TodoItems