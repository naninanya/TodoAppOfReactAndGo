// type
export type ItemsPropsType = {
    item: SingleTodoItemType;
}

export type AllItemsPropsType = {
    items: AllTodoItemsType;
}

// interface
export interface SingleTodoItemType {
    Id: number,
    Name: string,
    Created_at: string,
    Updated_at: string,
}

export interface AllTodoItemsType extends Array<SingleTodoItemType> { }
