import React from "react"

// type
export type ItemsPropsType = {
    item: SingleTodoItemType;
}

export type AllItemsPropsType = {
    items: AllTodoItemsType;
}

export type FormPropsType = {
    todoName: string;
    setTodoName: React.Dispatch<React.SetStateAction<string>>;
}

// interface
export interface SingleTodoItemType {
    Id: number,
    Name: string,
    Created_at: string,
    Updated_at: string,
}

export interface AllTodoItemsType extends Array<SingleTodoItemType> { }
