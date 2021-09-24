// type
export type ItemsPropsType = {
    item: SingleTodoItemType;
    items: AllTodoItemsType;
    setItems: React.Dispatch<React.SetStateAction<AllTodoItemsType>>;
}

export type AllItemsPropsType = {
    items: AllTodoItemsType;
    setItems: React.Dispatch<React.SetStateAction<AllTodoItemsType>>;
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
