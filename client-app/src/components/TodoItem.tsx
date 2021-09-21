import DeleteButton from "./DeleteButton";

export type ItemType = {
    id: number;
    name: string;
}

type ItemPropsType = {
    item: ItemType;
}

const TodoItem = ({ item }: ItemPropsType) => {
    const name = item.name;
    return (
        <>
            {name && <div>{name}<DeleteButton /></div>}
        </>
    );
};

export default TodoItem