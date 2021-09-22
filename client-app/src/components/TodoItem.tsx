import { useState } from "react";
import { ItemsPropsType } from "../types";

const TodoItem = ({ item }: ItemsPropsType) => {
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