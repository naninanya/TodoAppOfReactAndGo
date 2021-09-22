import { useState } from "react";
import { AllTodoItemsType } from "../types";
import DeleteButton from "./DeleteButton";
import TodoItem from "./TodoItem";

type AllItemsPropsType = {
    items: AllTodoItemsType;
}

const TodoItems = ({ items }: AllItemsPropsType) => {
    return (
        <ul className="TodoItems-list">
            {items.map((item) =>
                <TodoItem item={item} />)}
        </ul>
    );
};

export default TodoItems