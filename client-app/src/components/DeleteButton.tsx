import React from "react";
import { AllItemsPropsType } from "../types";

const DeleteButton = ({ items, setItems }: AllItemsPropsType) => {

    const RemoveCompletedItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        const completedItems = items.filter((item) => item.isCompleted);
        const completedIds = completedItems.map((item) => item.Id);

        if (completedItems.length === 0)
            return;

        const url = `/api/delete`;
        const requestOption = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedId: completedIds })
        };
        fetch(url, requestOption)
            .then(res => {
                if (res.status === 200) {
                    const notCompletedItems = items.filter((item) => !item.isCompleted);
                    setItems(notCompletedItems);
                    return;
                }

                alert("Error occurred. ");
                console.log("response status is " + res.status + ".");
            })
            .catch(err => {
                alert("Error occurred. " + err);
                console.log(err);
            })
    }

    return (
        <button className="DeleteButton"
            type="submit" onClick={RemoveCompletedItem}>
            Clear completed Todo items
        </button>
    );
};

export default DeleteButton