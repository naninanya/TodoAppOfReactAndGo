// type
export type ItemsPropsType = {
    item: SingleTodoItemType;
    setCompleted: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type AllItemsPropsType = {
    items: AllTodoItemsType;
    setCompleted: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type FormPropsType = {
    addNewItem: (newId: number, name: string) => void;
}

// interface
export interface SingleTodoItemType {
    Id: number,
    Name: string,
    isCompleted: boolean,
    Created_at?: string,
    Updated_at?: string,
}

export interface AllTodoItemsType extends Array<SingleTodoItemType> { }
