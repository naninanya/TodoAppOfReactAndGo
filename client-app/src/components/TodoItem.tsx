import { useState } from "react";
import { SingleTodoItemType } from "../types";

type TtemsPropsType = {
    item: SingleTodoItemType;
}

const TodoItem = ({ item }: TtemsPropsType) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const onClick = () => {
        setClicked(!clicked);
    }

    return (
        <>
            <button className={!clicked ? "ItemButton" : "CompletedItemButton"}
                type="submit" onClick={onClick} key={item.Id}>
                {!clicked ? item.Name : item.Name + " Complete!"}
            </button>
        </>
    );
};

export default TodoItem;