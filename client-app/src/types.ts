// type
export type ItemsPropsType = {
    item: SingleTodoItemType;
    setCompleted: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type AllItemsPropsType = {
    items: AllTodoItemsType;
    setCompleted: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// interface
export interface SingleTodoItemType {
    Id: number,
    Name: string,
    Created_at: string,
    Updated_at: string,
    isCompleted: boolean,
}

export interface AllTodoItemsType extends Array<SingleTodoItemType> { }
