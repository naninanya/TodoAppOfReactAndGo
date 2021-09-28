package infrastructure

import (
	"database/sql"
	"strings"
	"todoApp/echo/domain"
	"todoApp/echo/domain/repository"
)

type TodoItemPersistence struct{}

func NewTodoItemRepository() repository.TodoItemRepository {
	return &TodoItemPersistence{}
}

func (tip *TodoItemPersistence) GetTodoItems(DB *sql.DB) ([]*domain.TodoItem, error) {
	item := domain.TodoItem{}
	items := []*domain.TodoItem{}

	rows, err := DB.Query("SELECT id, name, created_at, updated_at FROM todoitem")

	if err != nil {
		// return errors.Wrapf(err, "Cannot execute sql.")
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(
			&item.Id,
			&item.Name,
			&item.Created_at,
			&item.Updated_at); err != nil {
			// return errors.Wrapf(err, "Cannot scan to item.")
			return nil, err
		}

		items = append(items, &domain.TodoItem{
			Id:         item.Id,
			Name:       item.Name,
			Created_at: item.Created_at,
			Updated_at: item.Created_at,
		})
	}

	return items, nil
}

func (tip *TodoItemPersistence) Insert(DB *sql.DB, name string) (int, error) {
	var sql = [...]string{
		"Insert Into todoitem(name, created_at, updated_at)",
		"values($1, current_timestamp, current_timestamp)",
		"RETURNING ID",
	}

	var id int
	err := DB.QueryRow(strings.Join(sql[:], ""), name).Scan(&id)

	if err != nil {
		return -1, err
	}

	return id, nil
}

func (tip *TodoItemPersistence) Delete(DB *sql.DB, ids []int) error {
	tx, err := DB.Begin()

	//I implement uisng loop, because can not use id = any(array[1,2,3]).
	for _, id := range ids {
		stmt, err := DB.Prepare("Delete From todoitem where id = $1")

		if err != nil {
			tx.Rollback()
			return err
		}

		_, err = stmt.Exec(id)

		if err != nil {
			tx.Rollback()
			return err
		}
	}

	tx.Commit()
	return err
}
