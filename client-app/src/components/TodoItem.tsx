import { ItemsPropsType } from "../types";

const TodoItem = ({ item, items, setItems }: ItemsPropsType) => {

    const setCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = Number(e.currentTarget.id)
        setItems(items.map((item) => {
            if (item.Id === target)
                item.isCompleted = !item.isCompleted;
            return item;
        }))
    }

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