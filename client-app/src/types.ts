// type
export type AllItemsPropsType = {
    items: AllTodoItemsType;
}

// interface
export interface SingleTodoItemType {
    Id: number,
    Name: string,
}

export interface AllTodoItemsType extends Array<SingleTodoItemType> { }
