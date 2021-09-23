package repository

import (
	"database/sql"
	"todoApp/domain"
)

type TodoItemRepository interface {
	GetTodoItems(DB *sql.DB) ([]*domain.TodoItem, error)
	Insert(DB *sql.DB, name string) error
	Delete(DB *sql.DB, ids []string) error
}
