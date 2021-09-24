import { AllItemsPropsType } from "../types";
import TodoItem from "./TodoItem";

const TodoItems = ({ items, setItems }: AllItemsPropsType) => {
    return (
        <>
            {items.map((item) => <TodoItem item={item} items={items} setItems={setItems} />)}
        </>
    );
};

export default TodoItems