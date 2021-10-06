import { Button } from "@mui/material";
import { AllItemsPropsType } from "../types";

const TodoItems = ({ items, setItems }: AllItemsPropsType) => {

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
            <br />
            <br />
            {items.map((item) =>
                <Button className="ItemButton" variant="outlined"
                    color={!item.isCompleted ? "success" : "secondary"}
                    type="submit" onClick={setCompleted} id={item.Id.toString()} key={item.Id}>
                    {!item.isCompleted ? item.Name : item.Name + " Complete!"}
                </Button>
            )}
        </>
    );
};

export default TodoItems