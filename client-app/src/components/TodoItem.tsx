import { ItemsPropsType } from "../types";

const TodoItem = ({ item, setCompleted }: ItemsPropsType) => {
    return (
        <>
            <button className={!item.isCompleted ? "ItemButton" : "CompletedItemButton"}
                type="submit" onClick={setCompleted} id={item.Id.toString()}>
                {!item.isCompleted ? item.Name : item.Name + " Complete!"}
            </button>
        </>
    );
};

export default TodoItem;