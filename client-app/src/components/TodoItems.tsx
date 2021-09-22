import { AllTodoItemsType } from "../types";
import DeleteButton from "./DeleteButton";

type AllItemsPropsType = {
    items: AllTodoItemsType;
}

const TodoItems = ({ items }: AllItemsPropsType) => {
    return (
        <ul>
            {items.map((item) =>
                <li key={item.Id}>{item.Name}</li>)}
        </ul>
    );
};

export default TodoItems