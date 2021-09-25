package handler

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"todoApp/infrastructure"

	_ "github.com/lib/pq"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
)

type dbConfig struct {
	DbDriver string `json:"dbDriver"`
	Dsn      string `json:"dsn"`
}

func loadConfig() (*dbConfig, error) {
	f, err := os.Open("./private/DBConfig.json")
	if err != nil {
		log.Fatal("loadConfig os.Open err", err)
		return nil, err
	}
	defer f.Close()

	var cfg dbConfig
	err = json.NewDecoder(f).Decode(&cfg)
	return &cfg, err
}

var (
	Client *sql.DB
)

func init() {
	config, err := loadConfig()
	if err != nil {
		log.Fatal("Cannot exectute loadConfig.", err)
	}

	Client, err = sql.Open(config.DbDriver, config.Dsn)
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
