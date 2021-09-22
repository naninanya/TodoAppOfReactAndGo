import { useState } from "react";
import { SingleTodoItemType } from "../types";

type TtemsPropsType = {
    item: SingleTodoItemType;
}

const TodoItem = ({ item }: TtemsPropsType) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const onClick = () => {
        setClicked(true);
    }

    return (
        <>
            <li key={item.Id} >{item.Name}
                <button type="submit" onClick={onClick}> Buy!</button>
                {clicked && <a>test</a>}
            </li>
        </>
    );
};

export default TodoItem;