// interface
interface SingleTodoItemType {
    Id: number,
    Name: string,
}

export interface AllTodoItemsType extends Array<SingleTodoItemType> { }
