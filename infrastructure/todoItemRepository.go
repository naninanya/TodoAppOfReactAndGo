package infrastructure

import (
	"database/sql"
	"todoApp/domain"
	"todoApp/domain/repository"
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

func (tip *TodoItemPersistence) Insert(DB *sql.DB, name string) error {
	stmt, err := DB.Prepare("Insert Into todoitem(name, created_at, updated_at) values($1, current_timestamp, current_timestamp)")
	if err != nil {
		return err
	}

	_, err = stmt.Exec(name)
	return err
}

func (tip *TodoItemPersistence) Delete(DB *sql.DB, ids []string) error {
	stmt, err := DB.Prepare("Delete todoitem where id = Any(string_to_array($1,','))")

	if err != nil {
		return err
	}

	_, err = stmt.Exec(ids)
	return err
}
