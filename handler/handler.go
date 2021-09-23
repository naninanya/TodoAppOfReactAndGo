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

func Insert() echo.HandlerFunc {
	return func(c echo.Context) error {
		name := c.Param("name")

		err := infrastructure.NewTodoItemRepository().Insert(Client, name)

		if err != nil {
			return errors.Wrapf(err, "Cannot insert.")
		}

		return c.String(http.StatusOK, "Complete insert.")
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		// todo convert body json

		return c.String(http.StatusOK, "Complete delete.")
	}

}
