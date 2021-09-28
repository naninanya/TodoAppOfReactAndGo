package handler

import (
	"database/sql"
	"net/http"
	"os"
	"todoApp/echo/infrastructure"

	_ "github.com/lib/pq"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
)

var Client *sql.DB

func init() {
	dbName := os.Getenv("POSTGRES_DB")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dsn := "host=dbServer port=5432 user=" + dbUser + " password=" + dbPassword + " dbname=" + dbName + " sslmode=disable"

	Client, err := sql.Open("postgres", dsn)
	if err != nil {
		panic(err)
	}

	if err = Client.Ping(); err != nil {
		panic(err)
	}
	// defer db.Close()
}

func GetAllTodoItems() echo.HandlerFunc {
	return func(c echo.Context) error {

		items, err := infrastructure.NewTodoItemRepository().GetTodoItems(Client)

		if err != nil {
			return errors.Wrapf(err, "Cannot get todo items.")
		}

		return c.JSON(http.StatusOK, items)
	}
}

type InsertResult struct {
	Id int `json:"id"`
}

func Insert() echo.HandlerFunc {
	return func(c echo.Context) error {
		name := c.Param("name")
		lastInsertId, err := infrastructure.NewTodoItemRepository().Insert(Client, name)

		if err != nil {
			return errors.Wrapf(err, "Cannot insert.")
		}

		r := InsertResult{Id: lastInsertId}
		return c.JSON(http.StatusOK, r)
	}
}

type DeleteRequest struct {
	CompletedId []int `json:"completedId"`
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		d := new(DeleteRequest)
		if err := c.Bind(d); err != nil {
			return errors.Wrapf(err, "Connot get json from request.")
		}

		err := infrastructure.NewTodoItemRepository().Delete(Client, d.CompletedId)

		if err != nil {
			return errors.Wrapf(err, "Connot delete.")
		}

		return c.String(http.StatusOK, "Complete delete.")
	}

}
