package repository

import (
	"database/sql"
	"todoApp/domain"
)

type TodoItemRepository interface {
	Insert(DB *sql.DB, name string) error
	GetTodoItems(DB *sql.DB) ([]*domain.TodoItem, error)
}
